import { Role } from '@prisma/client';
import { ok, fail, sameOrigin } from '@/lib/http';
import { getUser } from '@/lib/auth';
import { seedDemo } from '@/lib/seed';

export const dynamic = 'force-dynamic';

// Admin-only: adds categories and clearly labelled DEMO products (safe to run twice).
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!user || user.role !== Role.ADMIN) return fail('Admin only', 403);
  return ok(await seedDemo());
}
