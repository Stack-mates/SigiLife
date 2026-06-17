/**
 * Shared types & domain constants — moved to @sigilife/shared (ADR-016) so the
 * mobile app can import them too. This is a re-export shim: existing `@/types`
 * imports keep working; new/web+mobile code should import from "@sigilife/shared".
 */
export * from "@sigilife/shared";
