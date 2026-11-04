import { TicketStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin } from '@/lib/http';
import { getUser, isStaff } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { code: string } }) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!isStaff(user)) return fail('Staff only', 403);
  const r = await prisma.ticket.updateMany({ where: { code: params.code.toUpperCase() }, data: { status: TicketStatus.RESOLVED } });
  if (r.count === 0) return fail('Ticket not found', 404);
  return ok({ ok: true });
}
