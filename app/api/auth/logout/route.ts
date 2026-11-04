import { ok, fail, sameOrigin } from '@/lib/http';
import { destroySession } from '@/lib/auth';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Bad origin', 403);
  await destroySession();
  return ok({ ok: true });
}
