/**
 * /api/sigils/[id]/vote — community ✨/🔥 voting.
 * STATUS: stub
 *
 * POST (M4): body {type: "CHARGE"|"DESTROY"} (voteSchema). Toggle semantics
 * in ONE transaction: same vote exists → delete (retract); opposite → update;
 * none → create. Then recompute chargeScore/destroyScore on the Sigil row.
 * Returns {chargeScore, destroyScore, viewerVote}.
 * Unique (sigilId, userId) constraint is the real enforcement.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (vote endpoint)
 * @see docs/API_CONTRACT.md, docs/features/map.md
 */
import { notImplemented } from "@/lib/api";

export async function POST() {
  return notImplemented("POST /api/sigils/[id]/vote");
}
