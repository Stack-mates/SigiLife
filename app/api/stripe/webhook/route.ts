/**
 * /api/stripe/webhook — Stripe → SigiLife state sync. THE only writer of
 * Subscription + Entitlement rows.
 * STATUS: stub
 *
 * POST (M7): verify signature against STRIPE_WEBHOOK_SECRET on the RAW body
 * (no JSON middleware). Handle: checkout.session.completed,
 * customer.subscription.updated, customer.subscription.deleted →
 * upsert Subscription, recompute Entitlements (sigil_slots, premium_styles).
 * Must be idempotent — Stripe retries. Returns 200 fast; work is small.
 *
 * @see docs/API_CONTRACT.md, docs/features/monetization.md
 */
import { notImplemented } from "@/lib/api";

export async function POST() {
  return notImplemented("POST /api/stripe/webhook");
}
