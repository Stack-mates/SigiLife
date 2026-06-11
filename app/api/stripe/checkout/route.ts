/**
 * /api/stripe/checkout — start a premium purchase.
 * STATUS: stub
 *
 * POST (M7): body {plan: "PREMIUM"} → create/reuse Stripe customer, create
 * Checkout session (price ID from env), return {url}. Success/cancel URLs
 * point at /premium. Entitlements are granted ONLY by the webhook, never here.
 *
 * @see docs/API_CONTRACT.md, docs/features/monetization.md
 */
import { notImplemented } from "@/lib/api";

export async function POST() {
  return notImplemented("POST /api/stripe/checkout");
}
