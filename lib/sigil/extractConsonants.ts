/**
 * extractConsonants — the sigil-crafting rule: intention → unique consonants.
 * STATUS: stub
 *
 * What goes here (M2): a PURE function — the first Vitest target.
 *   extractConsonants("I will finish what I start") → ["w","l","f","n","s","h","t","r"]
 * Rules (match v1 behavior — verify against the source before locking):
 * case-insensitive, letters only, vowels (aeiou) removed, first-occurrence
 * order preserved, deduplicated. Edge cases: empty/vowel-only intentions
 * return [] (UI blocks Next on empty seeds).
 *
 * v1 reference: inline in git show main:src/components/.../MakeSigilComponents/WriteSigil.tsx
 * @see docs/features/make-sigil.md, docs/GLOSSARY.md (consonant extraction)
 */
export function extractConsonants(intention: string): string[] {
  void intention;
  return [];
}
