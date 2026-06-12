/**
 * vectorSeed — layout math for placing letterform glyphs on the canvas.
 * STATUS: implemented
 *
 * Pure + deterministic (same characters → same layout): glyphs are arranged
 * in a loose ring around the canvas center, sized relative to the canvas,
 * with a small index-based angle wobble so the ring feels hand-laid rather
 * than mechanical. Fabric object creation stays in DrawSigilCanvas — this
 * module is unit-testable geometry only.
 *
 * @see docs/features/make-sigil.md
 */

export type SeedPlacement = {
  /** Center of the glyph in canvas coordinates. */
  x: number;
  y: number;
  /** Uniform scale to apply to the traced glyph (EM-sized → canvas-sized). */
  scale: number;
  /** Rotation in degrees — slight, deterministic, hand-laid feel. */
  angle: number;
};

/** Fraction of canvas size a glyph's em-height should occupy. */
const GLYPH_HEIGHT_RATIO = 0.16;
/** Ring radius as a fraction of canvas size. */
const RING_RADIUS_RATIO = 0.3;

export function seedLayout(
  count: number,
  canvasSize: number,
  glyphEmHeight: number,
): SeedPlacement[] {
  if (count <= 0) return [];

  const scale = (canvasSize * GLYPH_HEIGHT_RATIO) / glyphEmHeight;
  const radius = canvasSize * RING_RADIUS_RATIO;
  const center = canvasSize / 2;

  return Array.from({ length: count }, (_, i) => {
    // Start at 12 o'clock, even spacing, deterministic wobble per index.
    const wobble = (((i * 137) % 21) - 10) / 100; // ±0.10 rad
    const theta = -Math.PI / 2 + (i / count) * Math.PI * 2 + wobble;
    const radiusJitter = 1 + (((i * 89) % 13) - 6) / 80; // ±7.5%
    return {
      x: center + Math.cos(theta) * radius * radiusJitter,
      y: center + Math.sin(theta) * radius * radiusJitter,
      scale,
      angle: (((i * 53) % 17) - 8) * 1.5, // ±12°
    };
  });
}
