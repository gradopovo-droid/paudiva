import { prisma } from './db';

const CATEGORIES = [
  'Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Seeds',
  'Gardening Tools', 'Pots & Planters', 'Soil & Fertilizers', 'Eco-friendly'
];

// DEMO DATA: clearly marked isDemo. Replace with real seller listings.
const DEMO = [
  { t: 'Money Plant in Ceramic Pot', c: 'Indoor Plants', p: 34900, m: 49900, s: 25 },
  { t: 'Snake Plant (Medium)', c: 'Indoor Plants', p: 44900, m: 59900, s: 20 },
  { t: 'Marigold Flower Seeds, 50 pcs', c: 'Seeds', p: 7900, m: 9900, s: 100 },
  { t: 'Hand Trowel, Steel', c: 'Gardening Tools', p: 19900, m: 29900, s: 40 },
  { t: 'Terracotta Planter, 8 inch', c: 'Pots & Planters', p: 24900, m: 32900, s: 30 },
  { t: 'Organic Vermicompost, 2 kg', c: 'Soil & Fertilizers', p: 17900, m: 22900, s: 50 },
  { t: 'Hibiscus Plant', c: 'Flowering Plants', p: 29900, m: 39900, s: 15 },
  { t: 'Coir Grow Bags, Pack of 3', c: 'Eco-friendly', p: 32900, m: 44900, s: 35 }
];

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function seedDemo(): Promise<{ categories: number; products: number }> {
  const ids: Record<string, string> = {};
  for (const name of CATEGORIES) {
    const c = await prisma.category.upsert({
      where: { slug: slug(name) },
      update: {},
      create: { name, slug: slug(name) }
    });
    ids[name] = c.id;
  }
  let added = 0;
  for (const d of DEMO) {
    const exists = await prisma.product.findFirst({ where: { title: d.t, isDemo: true } });
    if (exists) continue;
    await prisma.product.create({
      data: { title: d.t, pricePaise: d.p, mrpPaise: d.m, stock: d.s, isDemo: true, categoryId: ids[d.c] }
    });
    added++;
  }
  return { categories: CATEGORIES.length, products: added };
}
