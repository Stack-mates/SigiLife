/**
 * stripe — Stripe client + price/plan mapping.
 * STATUS: implemented (M7)
 *
 * Lazy singleton Stripe client (STRIPE_SECRET_KEY), plan→priceId map
 * (env-driven), and getOrCreateCustomer helper used by the checkout and
 * webhook routes.
 *
 * The client is instantiated lazily (first call to getStripe()) so that
 * Next.js build-time page collection doesn't throw when STRIPE_SECRET_KEY
 * is empty. At runtime, any Stripe call will throw if the key is missing.
 *
 * @see docs/features/monetization.md
 */
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// ── Lazy singleton ────────────────────────────────────────────────────────────

const globalForStripe = globalThis as unknown as { _stripe?: Stripe };

function getStripe(): Stripe {
  if (globalForStripe._stripe) return globalForStripe._stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Configure it in .env before using Stripe features."
    );
  }

  const client = new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
  globalForStripe._stripe = client;
  return client;
}

/**
 * The Stripe client. Throws at first call if STRIPE_SECRET_KEY is missing.
 * Use this instead of `new Stripe(...)` everywhere in the codebase.
 */
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// ── Price IDs (populated from env; empty string = not configured yet) ────────

export const PRICE_IDS = {
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID ?? "",
  PREMIUM_YEARLY: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID ?? "",
  FOUNDER: process.env.STRIPE_FOUNDER_PRICE_ID ?? "",
} as const;

// ── Customer helper ──────────────────────────────────────────────────────────

/**
 * Returns the Stripe customer ID for the given user, creating one if needed.
 * Idempotent — safe to call on every checkout attempt.
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string
): Promise<string> {
  // Check if a Subscription row already has a customer ID.
  const existing = await prisma.subscription.findUnique({
    where: { userId },
    select: { stripeCustomerId: true },
  });

  if (existing?.stripeCustomerId) {
    return existing.stripeCustomerId;
  }

  // Create a new Stripe customer.
  const customer = await getStripe().customers.create({
    email,
    metadata: { sigilife_user_id: userId },
  });

  // Upsert the Subscription row with the new customer ID (plan stays FREE).
  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: customer.id,
      plan: "FREE",
    },
    update: {
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
}
