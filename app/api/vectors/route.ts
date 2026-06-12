/**
 * /api/vectors — letterform path data for the sigil editor.
 * STATUS: implemented
 *
 * POST {characters: string[]} → {data: {glyphs: TracedGlyph[], missing: string[]}}
 * Glyphs are traced at request time from the sigil font (lib/sigil/traceGlyphs,
 * ADR-008 — no DB involved). `missing` lists characters the font can't draw;
 * the editor surfaces them as a notice. No auth yet (ADR-009: creation flow
 * runs pre-auth); add session check when auth lands.
 *
 * @see docs/API_CONTRACT.md, docs/features/make-sigil.md
 */
import { NextRequest } from "next/server";
import { z } from "zod";
import { err, ok } from "@/lib/api";
import { traceGlyphs } from "@/lib/sigil/traceGlyphs";

const vectorsSchema = z.object({
  characters: z
    .array(z.string().min(1).max(2)) // one code point; max 2 units for surrogate pairs
    .min(1)
    .max(64),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return err("VALIDATION", "Request body must be JSON");
  }

  const parsed = vectorsSchema.safeParse(body);
  if (!parsed.success) {
    return err("VALIDATION", parsed.error.issues[0]?.message ?? "Invalid characters payload");
  }

  try {
    const result = await traceGlyphs(parsed.data.characters);
    return ok(result);
  } catch (e) {
    console.error("glyph tracing failed:", e);
    return err("INTERNAL", "Could not trace glyphs from the sigil font");
  }
}
