/**
 * /api/ar/placements — AR anchors (M8, post-launch).
 * STATUS: stub
 *
 * GET (M8): viewer's placements (or ?sigilId= one).
 * PUT (M8): upsert {sigilId, posX/Y/Z, rotX/Y/Z/W} (placementSchema) —
 *   one placement per (user, sigil), owner only, flag-gated like /ar pages.
 *
 * v1 reference: ArPlacement model existed but endpoints were never finished.
 * @see docs/API_CONTRACT.md, docs/features/ar.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/ar/placements");
}

export async function PUT() {
  return notImplemented("PUT /api/ar/placements");
}
