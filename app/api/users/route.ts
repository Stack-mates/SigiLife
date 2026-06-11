/**
 * /api/users — user search.
 * STATUS: stub
 *
 * GET (M3): ?q=<username prefix> → UserSummary[] (id, username, avatar,
 * follow state relative to viewer). Min query length 2; excludes self.
 *
 * v1 reference: git show main:server/routes/user.routes.ts (search)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/users");
}
