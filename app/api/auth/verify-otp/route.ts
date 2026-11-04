import { z } from 'zod';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson } from '@/lib/http';
import { sha, safeEqual, createSession, publicUser } from '@/lib/auth';
import { normalize } from '@/lib/identity';

const schema = z.object({
  mode: z.enum(['mobile', 'email']),
  value: z.string().min(5).max(120),
  code: z.string().regex(/^\d{6}$/)
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const p = schema.safeParse(await readJson(req));
  if (!p.success) return fail('Enter the 6-digit OTP');
  const { mode, code } = p.data;
  const value = normalize(mode, p.data.value);
  if (!value) return fail('Invalid request');
  const identifier = `${mode}:${value}`;

  const rec = await prisma.otpCode.findFirst({
    where: { identifier, consumed: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' }
  });
  if (!rec) return fail('OTP expired. Request a new one.');
  if (rec.attempts >= 5) return fail('Too many wrong attempts. Request a new OTP.', 429);

  if (!safeEqual(sha(code + identifier), rec.codeHash)) {
    await prisma.otpCode.update({ where: { id: rec.id }, data: { attempts: { increment: 1 } } });
    return fail('Incorrect OTP');
  }
  const used = await prisma.otpCode.updateMany({ where: { id: rec.id, consumed: false }, data: { consumed: true } });
  if (used.count === 0) return fail('OTP already used');

  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const isAdmin = mode === 'email' && adminEmail !== '' && value === adminEmail;
  let user = await prisma.user.findUnique({ where: mode === 'email' ? { email: value } : { mobile: value } });
  if (!user) {
    user = await prisma.user.create({
      data: { ...(mode === 'email' ? { email: value } : { mobile: value }), role: isAdmin ? Role.ADMIN : Role.BUYER }
    });
  } else if (isAdmin && user.role !== Role.ADMIN) {
    user = await prisma.user.update({ where: { id: user.id }, data: { role: Role.ADMIN } });
  }
  if (user.suspended) return fail('This account is suspended', 403);

  await createSession(user.id);
  return ok({ user: publicUser(user) });
}
