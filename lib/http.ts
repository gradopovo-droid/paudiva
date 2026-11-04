import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function ok(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

export function fail(error: string, status = 400, extra?: Record<string, unknown>): NextResponse {
  return NextResponse.json({ error, ...(extra || {}) }, { status });
}

// Blocks cross-site POSTs from other websites (extra CSRF protection on top of SameSite cookies).
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export function randCode(prefix: string, digits = 6): string {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits);
  return prefix + String(crypto.randomInt(min, max));
}
