/**
 * /api/sigils — the sigil collection.
 * STATUS: stub
 *
 * GET  (M3/M4): list sigils. Query: scope=all|mine|user:<id>,
 *   status=active|destroyed (default active). Returns scores, location,
 *   owner summary — shaped for feed/map/library.
 * POST (M2): create from the wizard draft (createSigilSchema in
 *   lib/validation). Server-side: profanity filter (BAD_WORDS_API_KEY),
 *   slot check via lib/entitlements (LIMIT_REACHED), create Sigil +
 *   SigilShare rows + sigilCount++ in one transaction.
 *
 * v1 reference: git show main:server/routes/sigil.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/make-sigil.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/sigils");
}

export async function POST() {
  return notImplemented("POST /api/sigils");
}
