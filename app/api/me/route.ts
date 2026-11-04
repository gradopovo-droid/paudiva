import { ok } from '@/lib/http';
import { getUser, publicUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const u = await getUser();
  return ok({ user: u ? publicUser(u) : null });
}
