/**
 * entitlements — the ONLY way application code asks "what is this user allowed?"
 * STATUS: implemented (M7)
 *
 * Reads Entitlement rows only — NEVER Subscription/Stripe directly. The
 * webhook keeps entitlements in sync; grants work without subscriptions.
 *
 * @see docs/features/monetization.md, docs/DATA_MODEL.md
 */
import { prisma } from "@/lib/prisma";

export const FREE_SLOT_LIMIT = 12;
export const PREMIUM_SLOT_LIMIT = 36;

/**
 * How many sigil slots does this user have?
 * Reads the "sigil_slots" Entitlement row; falls back to FREE_SLOT_LIMIT.
 */
export async function getSlotLimit(userId: string): Promise<number> {
  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_key: { userId, key: "sigil_slots" } },
    select: { value: true },
  });

  if (entitlement === null) return FREE_SLOT_LIMIT;

  // value is a Json column — for slot counts it's stored as a number.
  const raw = entitlement.value;
  if (typeof raw === "number") return raw;

  return FREE_SLOT_LIMIT;
}

/**
 * Can the user create another sigil?
 * Active sigil count < slot limit.
 */
export async function canCreateSigil(userId: string): Promise<boolean> {
  const [limit, active] = await Promise.all([
    getSlotLimit(userId),
    prisma.sigil.count({
      where: { userId, status: "ACTIVE" },
    }),
  ]);

  return active < limit;
}

/**
 * Does the user have access to premium styles?
 * Reads the "premium_styles" Entitlement row.
 */
export async function hasPremiumStyles(userId: string): Promise<boolean> {
  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_key: { userId, key: "premium_styles" } },
    select: { value: true },
  });

  if (entitlement === null) return false;

  return entitlement.value === true;
}
