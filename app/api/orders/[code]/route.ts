import { prisma } from '@/lib/db';
import { ok, fail } from '@/lib/http';
import { getUser, isStaff } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const o = await prisma.order.findUnique({ where: { code: params.code.toUpperCase() }, include: { items: true } });
  if (!o || (o.userId !== user.id && !isStaff(user))) return fail('Order not found', 404);
  return ok({
    code: o.code,
    status: o.status,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    totalPaise: o.totalPaise,
    createdAt: o.createdAt,
    items: o.items.map((i) => ({ title: i.title, quantity: i.quantity, unitPaise: i.unitPaise }))
  });
}
