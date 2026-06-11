/**
 * /api/vectors — letterform seeds for the draw canvas.
 * STATUS: stub
 *
 * POST (M2): body {characters: string[]} (vectorsSchema) → SvgVector rows
 * (character, vectorData path, width, height) for the wizard's extracted
 * consonants. Data is seeded by prisma/seed.ts; this is a read-only lookup.
 *
 * v1 reference: git show main:server/routes/vector.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/make-sigil.md
 */
import { notImplemented } from "@/lib/api";

export async function POST() {
  return notImplemented("POST /api/vectors");
}
