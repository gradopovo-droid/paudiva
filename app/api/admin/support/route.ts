import { z } from 'zod';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson } from '@/lib/http';
import { getUser } from '@/lib/auth';
import { normalize } from '@/lib/identity';

export const dynamic = 'force-dynamic';

const schema = z.object({ email: z.string().min(5).max(120) });

// Only the main ADMIN can create support workers. They then log in with an email OTP.
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const user = await getUser();
  if (!user || user.role !== Role.ADMIN) return fail('Admin only', 403);
  const p = schema.safeParse(await readJson(req));
  const email = p.success ? normalize('email', p.data.email) : null;
  if (!email) return fail('Enter a valid email');
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.role === Role.ADMIN) return fail('That account is already an admin', 409);
  if (existing) await prisma.user.update({ where: { id: existing.id }, data: { role: Role.SUPPORT } });
  else await prisma.user.create({ data: { email, role: Role.SUPPORT } });
  return ok({ ok: true });
}
