import { ok, fail } from '@/lib/http';
import { getUser, isStaff } from '@/lib/auth';
import { ticketView } from '@/lib/tickets';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const user = await getUser();
  if (!user) return fail('Please log in', 401);
  const t = await ticketView(params.code.toUpperCase());
  if (!t || (t.userId !== user.id && !isStaff(user))) return fail('Ticket not found', 404);
  return ok(t.view);
}
