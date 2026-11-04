import { prisma } from '@/lib/db';
import { ok } from '@/lib/http';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim().slice(0, 60);
  const cat = (url.searchParams.get('category') || '').trim();
  const items = await prisma.product.findMany({
    where: {
      active: true,
      ...(cat && cat !== 'All' ? { category: { name: cat } } : {}),
      ...(q ? { title: { contains: q } } : {})
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 60
  });
  return ok({
    products: items.map((p) => ({
      id: p.id,
      title: p.title,
      pricePaise: p.pricePaise,
      mrpPaise: p.mrpPaise,
      stock: p.stock,
      category: p.category.name,
      demo: p.isDemo
    }))
  });
}
