/**
 * /api/sigils/[id]/charge — complete the charge ritual.
 * STATUS: implemented
 *
 * PATCH (M3): owner only. Body {emotion} (chargeSchema, Emotion enum).
 * Sets isCharged = true + chargedEmotion. Re-charging with a new emotion
 * overwrites (decision in docs/features/charge-destroy.md open questions).
 * Ownership is enforced by chargeSigil(), which scopes its lookup to the
 * current user and returns null when the sigil is missing or not the
 * viewer's → 404.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (charge endpoint)
 * @see docs/API_CONTRACT.md, docs/features/charge-destroy.md
 */
import { type NextRequest } from "next/server";
import { ok, err, requireViewer, parse } from "@/lib/api";
import { chargeSigil } from "@/lib/sigil/actions";
import { chargeSchema } from "@/lib/validation";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireViewer();
    const { id } = await params;

    const body: unknown = await request.json();
    const parsed = parse(chargeSchema, body);
    if (!parsed.ok) return parsed.response;

    const sigil = await chargeSigil(id, parsed.data.emotion);
    if (!sigil) return err("NOT_FOUND", "Sigil not found.");

    return ok(sigil);
  } catch (e) {
    console.error("PATCH /api/sigils/[id]/charge error:", e);
    return err("INTERNAL", "Failed to charge sigil.");
  }
}
