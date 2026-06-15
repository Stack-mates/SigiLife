/**
 * /api/sigils/[id]/vote — community ✨/🔥 voting.
 * STATUS: implemented
 *
 * POST (M4): body {type: "CHARGE"|"DESTROY"} (voteSchema). Toggle semantics
 * in ONE transaction: same vote exists → delete (retract); opposite → update;
 * none → create. Then recompute chargeScore/destroyScore on the Sigil row.
 * Returns {chargeScore, destroyScore, viewerVote}.
 * Unique (sigilId, userId) constraint is the real enforcement.
 *
 * Any viewer may vote. Transactional toggle + score recompute live in
 * voteSigil() (lib/sigil/actions); this handler validates input and wraps
 * the result in the shared success envelope.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts (vote endpoint)
 * @see docs/API_CONTRACT.md, docs/features/map.md
 */
import { type NextRequest } from "next/server";
import { ok, err, parse, requireViewer } from "@/lib/api";
import { voteSchema } from "@/lib/validation";
import { voteSigil } from "@/lib/sigil/actions";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Resolve the acting user (any viewer may vote).
    await requireViewer();

    const { id } = await params;

    const body = await request.json().catch(() => null);
    const parsed = parse(voteSchema, body);
    if (!parsed.ok) return parsed.response;

    const result = await voteSigil(id, parsed.data.type);
    return ok(result);
  } catch (e) {
    console.error("POST /api/sigils/[id]/vote error:", e);
    return err("INTERNAL", "Failed to record vote.");
  }
}
