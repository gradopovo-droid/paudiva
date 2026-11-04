import crypto from 'crypto';
import { cookies } from 'next/headers';
import { Role, User } from '@prisma/client';
import { prisma } from './db';

const COOKIE = 'pd_session';
const DAYS = 30;

export function sha(input: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is not set');
  }
  return crypto.createHash('sha256').update(input + (secret || 'dev-only-secret')).digest('hex');
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export async function createSession(userId: string): Promise<void> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { tokenHash: sha(token), userId, expiresAt } });
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt
  });
}

export async function getUser(): Promise<User | null> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  const s = await prisma.session.findUnique({ where: { tokenHash: sha(token) }, include: { user: true } });
  if (!s || s.expiresAt < new Date() || s.user.suspended) return null;
  return s.user;
}

export async function destroySession(): Promise<void> {
  const token = cookies().get(COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { tokenHash: sha(token) } });
  cookies().delete(COOKIE);
}

export function isStaff(u: User | null): u is User {
  return !!u && (u.role === Role.ADMIN || u.role === Role.SUPPORT);
}

export function publicUser(u: User) {
  return { id: u.id, email: u.email, mobile: u.mobile, role: u.role };
}
