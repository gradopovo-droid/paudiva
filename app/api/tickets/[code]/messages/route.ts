import { z } from 'zod';
import { SenderType, TicketStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson } from '@/lib/http';
import { getUser, isStaff } from '@/lib/auth';
import { ticketView } from '@/lib/tickets';

export const dynamic = 'force-dynamic';

const schema = z.object({ body: z.string().trim().min(1).max(1000) });

export async function POST(req: Request, { params }: { params: { code: string } }) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const p = schema.safeParse(await readJson(req));
  if (!p.success) return fail('Type a message first');
  const code = params.code.toUpperCase();
  const t = await prisma.ticket.findUnique({ where: { code } });
  if (!t) return fail('Ticket not found', 404);

  const owner = t.userId === user.id;
  const staff = isStaff(user);
  if (!owner && !staff) return fail('Ticket not found', 404);
  if (t.status === TicketStatus.RESOLVED) return fail('This ticket is resolved', 409);

  if (staff && !owner) {
    const name = user.email ? user.email.split('@')[0] : 'Support';
    if (t.status === TicketStatus.WAITING) {
      await prisma.ticket.update({ where: { id: t.id }, data: { status: TicketStatus.AGENT_CONNECTED, agentName: name } });
      await prisma.ticketMessage.create({ data: { ticketId: t.id, sender: SenderType.SYSTEM, body: `${name} (Support Agent) joined the chat` } });
    }
    await prisma.ticketMessage.create({ data: { ticketId: t.id, sender: SenderType.AGENT, body: p.data.body } });
  } else {
    await prisma.ticketMessage.create({ data: { ticketId: t.id, sender: SenderType.CUSTOMER, body: p.data.body } });
  }
  const v = await ticketView(code);
  return ok(v ? v.view : { ok: true });
}
