/**
 * extractSigilCharacters — the sigil-crafting rule: intention → glyph seeds.
 * STATUS: implemented
 *
 * Rules (decided 2026-06-12, supersedes v1's consonants-only extraction):
 * - KEEP: consonant letters (incl. accented: ñ, ç, ß…), symbols & punctuation
 * - STRIP: vowels — a e i o u and their accented forms (é, ü, …) — spaces,
 *   digits, and duplicates
 * - Dedup: first instance wins. Letters dedup case-insensitively ("S" then
 *   "s" keeps only "S"); ñ and n are distinct letters. Symbols dedup exactly.
 * - Order of first appearance is preserved; "y" is treated as a consonant.
 *
 * Pure function — unit tested in extractSigilCharacters.test.ts.
 * @see docs/features/make-sigil.md, docs/GLOSSARY.md (character extraction)
 */

const VOWEL_BASES = new Set(["a", "e", "i", "o", "u"]);

/** Base letter with diacritics removed, lowercased ("É" → "e", "ñ" → "n"). */
function baseLetter(char: string): string {
  return char.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function extractSigilCharacters(intention: string): string[] {
  const kept: string[] = [];
  const seen = new Set<string>();

  for (const char of intention.normalize("NFC")) {
    if (/\s/u.test(char)) continue; // spaces & all whitespace
    if (/\p{N}/u.test(char)) continue; // digits (any script)

    if (/\p{L}/u.test(char)) {
      if (VOWEL_BASES.has(baseLetter(char))) continue; // vowels incl. accented
      const key = char.toLowerCase(); // ñ ≠ n, but S ≡ s
      if (seen.has(key)) continue;
      seen.add(key);
      kept.push(char);
    } else if (/[\p{P}\p{S}]/u.test(char)) {
      if (seen.has(char)) continue; // symbols dedup exactly
      seen.add(char);
      kept.push(char);
    }
    // anything else (stray combining marks, control chars) is dropped
  }

  return kept;
}
