/**
 * entitlements — the ONLY way application code asks "what is this user allowed?"
 * STATUS: stub
 *
 * What goes here (M2 basic / M7 full):
 *   getSlotLimit(userId): Promise<number>   // Entitlement "sigil_slots" else FREE_SLOT_LIMIT (12)
 *   canCreateSigil(userId): Promise<boolean> // active sigil count < slot limit
 *   hasPremiumStyles(userId): Promise<boolean>
 * Reads Entitlement rows only — NEVER Subscription/Stripe directly (the
 * webhook keeps entitlements in sync; grants work without subscriptions).
 * M2 ships the constants + count check against the flat 12; M7 wires
 * Entitlement lookups.
 *
 * @see docs/features/monetization.md, docs/DATA_MODEL.md
 */
export const FREE_SLOT_LIMIT = 12;
