import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson, randCode } from '@/lib/http';
import { getUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const schema = z.object({
  items: z.array(z.object({ productId: z.string().min(1).max(40), qty: z.number().int().min(1).max(20) })).min(1).max(30),
  name: z.string().trim().min(2).max(60),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  address: z.string().trim().min(10).max(300),
  pincode: z.string().regex(/^[1-9]\d{5}$/)
});

export async function GET() {
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { code: true, status: true, totalPaise: true, createdAt: true }
  });
  return ok({ orders });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const p = schema.safeParse(await readJson(req));
  if (!p.success) return fail('Please check your order details');
  const d = p.data;

  const wanted = new Map<string, number>();
  for (const it of d.items) wanted.set(it.productId, (wanted.get(it.productId) || 0) + it.qty);
  const ids = Array.from(wanted.keys());
  const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } });
  if (products.length !== ids.length) return fail('Some products are no longer available', 409);

  try {
    const order = await prisma.$transaction(async (tx) => {
      let total = 0;
      const lines: { productId: string; title: string; unitPaise: number; quantity: number }[] = [];
      for (const pr of products) {
        const qty = wanted.get(pr.id) || 0;
        const r = await tx.product.updateMany({ where: { id: pr.id, stock: { gte: qty } }, data: { stock: { decrement: qty } } });
        if (r.count === 0) throw new Error('STOCK:' + pr.title);
        total += pr.pricePaise * qty;
        lines.push({ productId: pr.id, title: pr.title, unitPaise: pr.pricePaise, quantity: qty });
      }
      return tx.order.create({
        data: {
          code: randCode('PD-', 7),
          userId: user.id,
          totalPaise: total,
          buyerName: d.name,
          deliveryMobile: d.mobile,
          address: d.address,
          pincode: d.pincode,
          items: { create: lines }
        }
      });
    });
    return ok({ code: order.code, totalPaise: order.totalPaise }, 201);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('STOCK:')) return fail('Not enough stock for ' + e.message.slice(6), 409);
    console.error(e);
    return fail('Could not place the order. Try again.', 500);
  }
}
