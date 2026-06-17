/**
 * extractSigilCharacters — moved to @sigilife/shared (ADR-016) so web + mobile
 * share the sigil-crafting rule. Re-export shim: existing imports keep working;
 * prefer "@sigilife/shared" in new code.
 *
 * @see docs/features/make-sigil.md
 */
export { extractSigilCharacters } from "@sigilife/shared";
