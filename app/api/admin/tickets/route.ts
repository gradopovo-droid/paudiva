import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/http';
import { getUser, isStaff } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUser();
  if (!isStaff(user)) return fail('Staff only', 403);
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { messages: { orderBy: { createdAt: 'asc' }, take: 1 } }
  });
  return ok({
    tickets: tickets.map((t) => ({
      code: t.code,
      category: t.category,
      orderCode: t.orderCode,
      status: t.status,
      agentName: t.agentName,
      preview: t.messages[0] ? t.messages[0].body.slice(0, 80) : '',
      createdAt: t.createdAt
    }))
  });
}
