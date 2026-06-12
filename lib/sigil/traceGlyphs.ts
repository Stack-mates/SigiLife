/**
 * traceGlyphs — trace character outlines from the sigil font at runtime.
 * STATUS: implemented (server-only — uses fs)
 *
 * Replaces the v1 SvgVector table + seed pipeline (ADR-008): the font file
 * is the source of truth, so ANY glyph it covers (accented consonants,
 * symbols) traces to full SVG path data on demand. Font is parsed once and
 * cached at module scope.
 *
 * @see docs/features/make-sigil.md, docs/API_CONTRACT.md (/api/vectors)
 */
import { readFile } from "fs/promises";
import path from "path";
import { parse as parseFont, type Font } from "opentype.js";

const FONT_PATH = path.join(process.cwd(), "public/fonts/UncialAntiqua-Regular.ttf");
/** Render size of the traced path's em square, in canvas units. */
const EM_SIZE = 120;

export type TracedGlyph = {
  character: string;
  /** SVG path data ("M … Z"), y-down coordinates, baseline at y = ascender. */
  pathData: string;
  /** Advance width at EM_SIZE — natural horizontal footprint of the glyph. */
  width: number;
  /** Em height (EM_SIZE) — vertical footprint including ascender/descender. */
  height: number;
};

let fontPromise: Promise<Font> | null = null;

function loadFont(): Promise<Font> {
  if (!fontPromise) {
    fontPromise = readFile(FONT_PATH).then((buf) =>
      parseFont(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)),
    );
  }
  return fontPromise;
}

/**
 * Trace each character to SVG path data. Characters the font has no glyph
 * for are returned in `missing` (the UI tells the user, never crashes).
 */
export async function traceGlyphs(
  characters: string[],
): Promise<{ glyphs: TracedGlyph[]; missing: string[] }> {
  const font = await loadFont();
  const scale = EM_SIZE / font.unitsPerEm;
  const baseline = font.ascender * scale; // y of baseline in y-down space

  const glyphs: TracedGlyph[] = [];
  const missing: string[] = [];

  for (const character of characters) {
    const glyph = font.charToGlyph(character);
    if (glyph.index === 0) {
      missing.push(character);
      continue;
    }
    glyphs.push({
      character,
      pathData: glyph.getPath(0, baseline, EM_SIZE).toPathData(2),
      width: (glyph.advanceWidth ?? font.unitsPerEm) * scale,
      height: EM_SIZE,
    });
  }

  return { glyphs, missing };
}
