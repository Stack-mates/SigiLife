/**
 * /api/sigils/[id]/share — share a sigil with SigiFriends.
 * STATUS: stub
 *
 * POST (M3): owner only. Body {userIds} (shareSchema). Validates each target
 * is someone the owner follows; upserts SigilShare rows (the SigiLites).
 * Replaces v1's POST /share + denormalized SigilGroup.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (share endpoint)
 * @see docs/API_CONTRACT.md, docs/features/social.md
 */
import { notImplemented } from "@/lib/api";

export async function POST() {
  return notImplemented("POST /api/sigils/[id]/share");
}
