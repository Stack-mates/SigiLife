/**
 * Validation schemas — moved to @sigilife/shared (ADR-016). Re-export shim so
 * `@/lib/validation` imports keep working; prefer "@sigilife/shared" in new code.
 *
 * @see docs/API_CONTRACT.md
 */
export * from "@sigilife/shared";
