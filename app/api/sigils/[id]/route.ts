/**
 * /api/sigils/[id] — one sigil.
 * STATUS: stub
 *
 * GET    (M3): sigil + votes summary + viewer's vote + SigiLites.
 * PATCH  (M3/M4): owner only — name and/or location (updateSigilSchema).
 * DELETE (M3): owner only — the DESTROY lifecycle, not a row delete:
 *   status → DESTROYED, destroyedAt, destroyCount++, slot freed (transaction).
 *   Hard delete is admin-only.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/grimoire.md, docs/features/charge-destroy.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/sigils/[id]");
}

export async function PATCH() {
  return notImplemented("PATCH /api/sigils/[id]");
}

export async function DELETE() {
  return notImplemented("DELETE /api/sigils/[id]");
}
