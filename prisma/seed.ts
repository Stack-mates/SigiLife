/**
 * Prisma seed — populates SvgVector with letterform path data.
 * STATUS: stub
 *
 * What goes here (M2, make-sigil milestone):
 * - Load a font file (opentype.js) from public/fonts/
 * - For each character a–z: extract the glyph path, normalize to a viewbox,
 *   upsert an SvgVector row { character, vectorData, width, height }
 * - Idempotent: safe to re-run (upsert on the unique `character` field)
 *
 * v1 reference: git show main:server/prisma/seed-opentype.js
 * Run with: npm run db:seed
 * @see docs/features/make-sigil.md
 */

async function main() {
  console.log("seed.ts is a stub — implemented in M2 (see docs/features/make-sigil.md)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
