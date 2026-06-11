/**
 * /api/sigils/[id]/charge — complete the charge ritual.
 * STATUS: stub
 *
 * PATCH (M3): owner only. Body {emotion} (chargeSchema, Emotion enum).
 * Sets isCharged = true + chargedEmotion. Re-charging with a new emotion
 * overwrites (decision in docs/features/charge-destroy.md open questions).
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (charge endpoint)
 * @see docs/API_CONTRACT.md, docs/features/charge-destroy.md
 */
import { notImplemented } from "@/lib/api";

export async function PATCH() {
  return notImplemented("PATCH /api/sigils/[id]/charge");
}
