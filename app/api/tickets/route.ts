import { z } from 'zod';
import { SenderType } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson, randCode } from '@/lib/http';
import { getUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const schema = z.object({
  category: z.enum(['Order', 'Payment', 'Delivery', 'Refund', 'Account', 'Other']),
  orderCode: z.string().trim().max(20).optional(),
  description: z.string().trim().min(10).max(1000)
});

export async function GET() {
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const tickets = await prisma.ticket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 30,
    select: { code: true, category: true, orderCode: true, status: true, agentName: true, createdAt: true }
  });
  return ok({ tickets });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const p = schema.safeParse(await readJson(req));
  if (!p.success) return fail('Please describe the issue (10+ characters)');
  const recent = await prisma.ticket.count({
    where: { userId: user.id, createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) } }
  });
  if (recent >= 5) return fail('Too many tickets. Please wait a while.', 429);
  const t = await prisma.ticket.create({
    data: {
      code: randCode('TK-', 6),
      userId: user.id,
      category: p.data.category,
      orderCode: p.data.orderCode ? p.data.orderCode.toUpperCase() : null,
      messages: {
        create: [
          { sender: SenderType.CUSTOMER, body: p.data.description },
          { sender: SenderType.SYSTEM, body: 'Ticket created. Please wait, an agent will join shortly.' }
        ]
      }
    }
  });
  return ok({ code: t.code }, 201);
}
