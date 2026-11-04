import { prisma } from './db';

export async function ticketView(code: string) {
  const t = await prisma.ticket.findUnique({
    where: { code },
    include: { messages: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } }
  });
  if (!t) return null;
  return {
    userId: t.userId,
    view: {
      code: t.code,
      category: t.category,
      orderCode: t.orderCode,
      status: t.status,
      agentName: t.agentName,
      messages: t.messages.map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: m.createdAt }))
    }
  };
}
