export type Mode = 'mobile' | 'email';

export function normalize(mode: Mode, raw: string): string | null {
  const v = mode === 'email' ? raw.trim().toLowerCase() : raw.trim();
  if (mode === 'mobile') return /^[6-9]\d{9}$/.test(v) ? v : null;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) && v.length <= 120 ? v : null;
}
