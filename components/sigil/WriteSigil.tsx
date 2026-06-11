/**
 * WriteSigil — intention input with live consonant extraction.
 * STATUS: stub · "use client"
 *
 * What goes here (M2): textarea bound to MakeSigilProvider draft.intention;
 * live unique-consonant chips via lib/sigil/extractConsonants (these become
 * the letterform seeds); max length (proposed 280 — open question in feature
 * doc); client profanity precheck on blur/next (server re-checks on save);
 * <NextButton> → /make-sigil/draw, disabled until valid.
 *
 * v1 reference: git show main:src/components/.../MakeSigilComponents/WriteSigil.tsx
 *   (the extraction logic to port lives inline there)
 * @see docs/features/make-sigil.md
 */
export function WriteSigil() {
  return <div>WriteSigil (stub)</div>;
}
