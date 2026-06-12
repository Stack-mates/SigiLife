import { describe, expect, it } from "vitest";
import { seedLayout } from "./vectorSeed";

describe("seedLayout", () => {
  it("returns one placement per glyph, deterministically", () => {
    const a = seedLayout(8, 600, 120);
    const b = seedLayout(8, 600, 120);
    expect(a).toHaveLength(8);
    expect(a).toEqual(b);
  });

  it("keeps every placement inside the canvas with margin", () => {
    for (const count of [1, 3, 8, 24, 64]) {
      for (const p of seedLayout(count, 600, 120)) {
        expect(p.x).toBeGreaterThan(60);
        expect(p.x).toBeLessThan(540);
        expect(p.y).toBeGreaterThan(60);
        expect(p.y).toBeLessThan(540);
      }
    }
  });

  it("scales glyphs relative to canvas size", () => {
    const [small] = seedLayout(1, 300, 120);
    const [large] = seedLayout(1, 900, 120);
    expect(large.scale).toBeCloseTo(small.scale * 3);
  });

  it("handles zero gracefully", () => {
    expect(seedLayout(0, 600, 120)).toEqual([]);
  });
});
