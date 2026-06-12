/**
 * Prisma seed — currently nothing to seed.
 * STATUS: stub
 *
 * v1 seeded letterform vectors into an SvgVector table; the rebuild traces
 * glyphs at runtime instead (ADR-008, lib/sigil/traceGlyphs.ts), so that
 * pipeline is gone. This file stays as the hook for future seed needs
 * (e.g. demo/staging fixtures). Run with: npm run db:seed
 */

async function main() {
  console.log("Nothing to seed — glyphs are traced at runtime (ADR-008).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
