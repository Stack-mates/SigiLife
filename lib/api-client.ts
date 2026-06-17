/**
 * API client — moved to @sigilife/api-client (ADR-016) so the mobile app shares
 * it. Re-export shim: `@/lib/api-client` imports keep working; prefer
 * "@sigilife/api-client" in new code.
 *
 * @see docs/API_CONTRACT.md, lib/api.ts
 */
export * from "@sigilife/api-client";
