import { describe, expect, it } from "vitest";
import { extractSigilCharacters } from "./extractSigilCharacters";

describe("extractSigilCharacters", () => {
  it("strips vowels, keeps consonants in first-appearance order", () => {
    expect(extractSigilCharacters("I will finish what I start")).toEqual([
      "w", "l", "f", "n", "s", "h", "t", "r",
    ]);
  });

  it("dedups letters case-insensitively, first instance wins", () => {
    expect(extractSigilCharacters("Steady steps")).toEqual(["S", "t", "d", "y", "p"]);
  });

  it("treats y as a consonant", () => {
    expect(extractSigilCharacters("my way")).toEqual(["m", "y", "w"]);
  });

  it("strips accented vowels but keeps accented consonants as distinct letters", () => {
    // S of Señor wins over s of José (case-insensitive dedup); ñ ≠ n
    expect(extractSigilCharacters("Señor José née")).toEqual(["S", "ñ", "r", "J", "n"]);
  });

  it("keeps symbols, dedups them exactly, strips digits", () => {
    expect(extractSigilCharacters("Save & save & thrive! 5000!")).toEqual([
      "S", "v", "&", "t", "h", "r", "!",
    ]);
  });

  it("returns empty for empty, whitespace, vowel-only, and digit-only input", () => {
    expect(extractSigilCharacters("")).toEqual([]);
    expect(extractSigilCharacters("   \n\t")).toEqual([]);
    expect(extractSigilCharacters("aeiou AEIOU éàü")).toEqual([]);
    expect(extractSigilCharacters("2026 365")).toEqual([]);
  });

  it("handles ß and other non-decomposing letters as consonants", () => {
    expect(extractSigilCharacters("Straße")).toEqual(["S", "t", "r", "ß"]);
  });

  it("normalizes decomposed input (combining marks) before classifying", () => {
    // "n" + combining tilde (NFD) should behave like precomposed "ñ";
    // the later plain "n" is a distinct letter and is kept
    expect(extractSigilCharacters("mañana")).toEqual(["m", "ñ", "n"]);
  });
});
