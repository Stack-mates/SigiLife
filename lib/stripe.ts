/**
 * stripe — Stripe client + price/plan mapping.
 * STATUS: stub (M7 — stripe package not installed yet, ADR-006)
 *
 * What goes here (M7): singleton Stripe client (STRIPE_SECRET_KEY), the
 * plan→priceId map (env-driven), helpers used by the checkout and webhook
 * routes (getOrCreateCustomer, constructWebhookEvent with raw-body
 * signature verification).
 *
 * @see docs/features/monetization.md
 */
export {};
