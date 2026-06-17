/**
 * @sigilife/shared — framework-agnostic code shared by web + mobile (ADR-016):
 * API response/domain types, zod validation schemas, the EMOTIONS map, and the
 * pure sigil-crafting rule (extractSigilCharacters). No React, no Next, no
 * Prisma — safe to import from a React Native app.
 */
export * from "./types";
export * from "./validation";
export * from "./extractSigilCharacters";
