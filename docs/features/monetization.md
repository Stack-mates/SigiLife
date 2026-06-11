# Feature: Monetization (Stripe)

**Milestone:** M7 · **Status:** stub

## Purpose
Turn the slot economy into revenue. Free tier keeps v1's 12 sigil slots;
Premium raises the cap and unlocks cosmetic depth. Stripe Checkout +
webhook-synced subscriptions; all permission checks go through entitlements.

## Proposed packaging (v1 of pricing — validate before launch)

| | Free | Premium (monthly/yearly) |
|---|---|---|
| Sigil slots | 12 | 36 |
| Styles | base color/ring/glow | premium glows, ring sets, canvas textures |
| Grimoire | standard book | premium book skins |
| AR placement (M8) | — | included (if AR ships) |

Founder grant: both devs + early friends get Premium via `Entitlement`
rows with `source: GRANT` — no fake subscriptions.

## Architecture (the part to get right early)
- **Stripe is the source of truth for billing; `Entitlement` is the source
  of truth for permissions.** App code calls `lib/entitlements.ts`
  (`getSlotLimit(userId)`, `hasPremiumStyles(userId)`) and never reads
  Subscription/Stripe directly.
- `POST /api/stripe/checkout` → Checkout session (plan → price ID env-mapped).
- `POST /api/stripe/webhook` → verify signature; on
  `checkout.session.completed`, `customer.subscription.updated|deleted`:
  upsert Subscription, recompute Entitlements. Idempotent.
- Slot enforcement: `POST /api/sigils` checks
  `activeSigilCount < getSlotLimit(userId)` → `LIMIT_REACHED`.

## Components & routes
- `app/(app)/premium/page.tsx` — plan comparison, checkout launch, manage
  (Stripe billing portal link).
- `premium/UpgradeCard`, `premium/SlotMeter` (slots used/total — also shown
  in make-sigil when near cap), `premium/PaywallGate` (wraps premium-only UI
  with an in-fiction upsell).

## Data
Subscription + Entitlement models — see DATA_MODEL.md. Webhook is the only
writer of both.

## Acceptance criteria
- [ ] Test-mode purchase → slots increase without redeploy or manual step.
- [ ] Subscription cancel → entitlements revert at period end (not instantly).
- [ ] Webhook is idempotent (Stripe retries) and signature-verified.
- [ ] No premium check ever happens client-side only.

## Open questions
- Price points (research comps: Finch, tarot apps; decide pre-M7).
- Yearly discount %; free trial or not.
- What happens to sigils 13–36 if premium lapses? (Lean: they lock —
  visible, not chargeable — never deleted.)
