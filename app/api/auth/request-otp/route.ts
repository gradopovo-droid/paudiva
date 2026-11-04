import crypto from 'crypto';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ok, fail, sameOrigin, readJson } from '@/lib/http';
import { sha } from '@/lib/auth';
import { normalize } from '@/lib/identity';

const schema = z.object({ mode: z.enum(['mobile', 'email']), value: z.string().min(5).max(120) });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  const p = schema.safeParse(await readJson(req));
  if (!p.success) return fail('Invalid request');
  const { mode } = p.data;
  const value = normalize(mode, p.data.value);
  if (!value) return fail(mode === 'mobile' ? 'Enter a valid 10-digit mobile number' : 'Enter a valid email');

  const identifier = `${mode}:${value}`;
  const last = await prisma.otpCode.findFirst({ where: { identifier }, orderBy: { createdAt: 'desc' } });
  if (last) {
    const wait = 30 - Math.floor((Date.now() - last.createdAt.getTime()) / 1000);
    if (wait > 0) return fail(`Please wait ${wait}s before requesting another OTP`, 429, { retryAfter: wait });
  }
  const recent = await prisma.otpCode.count({
    where: { identifier, createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) } }
  });
  if (recent >= 5) return fail('Too many OTP requests. Try again in 10 minutes.', 429);

  const code = String(crypto.randomInt(100000, 1000000));
  await prisma.otpCode.create({
    data: { identifier, codeHash: sha(code + identifier), expiresAt: new Date(Date.now() + 5 * 60 * 1000) }
  });

  if (mode === 'email' && process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [value],
        subject: 'Your PAUDIVA login code',
        text: `Your PAUDIVA OTP is ${code}. It expires in 5 minutes. If you did not ask for it, ignore this email.`
      })
    });
    if (!r.ok) return fail('Could not send the email. Try again later.', 502);
    return ok({ ok: true });
  }
  if (process.env.OTP_DEV_ECHO === 'true') return ok({ ok: true, devCode: code });
  return fail('OTP delivery is not set up yet for this method.', 501);
}
