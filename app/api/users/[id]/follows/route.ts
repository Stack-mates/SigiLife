/**
 * /api/users/[id]/follows — the follow graph around a user.
 * STATUS: stub
 *
 * GET    (M3): ?direction=followers|following|mutual → UserSummary[].
 *   "mutual" = SigiFriends (intersection, computed in the query).
 * POST   (M3): viewer follows [id]. Idempotent (unique constraint → no-op).
 * DELETE (M3): viewer unfollows [id].
 *
 * v1 reference: git show main:server/routes/user.routes.ts (follow endpoints)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/users/[id]/follows");
}

export async function POST() {
  return notImplemented("POST /api/users/[id]/follows");
}

export async function DELETE() {
  return notImplemented("DELETE /api/users/[id]/follows");
}
