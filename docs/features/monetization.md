# Feature: Monetization (Stripe)

**Milestone:** M7 (subscription core) · partnerships are post-traction · **Status:** stub
**Strategy discussed & expanded:** 2026-06-12

## Purpose
Turn the slot economy into revenue. Free tier keeps v1's 12 sigil slots;
Premium raises the cap and unlocks cosmetic depth. Stripe Checkout +
webhook-synced subscriptions; all permission checks go through entitlements.

**Strategic frame:** the slot cap is a product mechanic (destruction-as-
completion requires scarcity), not an artificial paywall — monetize depth,
never access. And none of this matters without day-30 retention: M5 rituals
and M6 tutorial shipping *before* M7 is the real monetization strategy.

## Packaging (v1 of pricing — validate before launch)

| | Free | Premium (monthly/yearly) | Founder (one-time, launch only) |
|---|---|---|---|
| Sigil slots | 12 | 36 | 36 |
| Styles | base color/ring/glow | premium glows, ring sets, canvas textures | premium + exclusive charter set |
| Grimoire | standard book | premium book skins | + charter skin |
| Seasonal drops | purchasable à la carte | some included | some included |
| AR placement (M8) | — | included (if AR ships) | included |
| Fiction framing | Agent | Expanded caseload | **Charter agent of The Office** |

**Pricing (launch proposal, from comps — Finch ~$40/yr, Day One/Co-Star
$3–5/mo):** **$3.99/mo · $24.99/yr · Founder $49–59 one-time, capped
quantity.** Open slightly under the comps; raising later (grandfathering
subscribers) is easy, cutting is a death signal.

**Founder tier** ships at launch — it's nearly free to build (an
`Entitlement` row with `source: GRANT` + a Stripe one-time price) and front-
loads cash flow from the earliest believers. Both devs + early friends also
get Premium via GRANT — no fake subscriptions.

## Cosmetic drops on the ritual calendar (post-launch, month 1+)

Seasonal style collections (glows, ring sets, grimoire skins) released on
the **actual ritual calendar** — solstices, equinoxes, new moons. The
hand-made Lino art pipeline is the moat; drops are cheap to produce, create
engagement spikes on a thematically perfect cadence, and sell two ways:
à la carte one-time purchases (**$1.99–3.99**) and partially included in
Premium so the subscription accrues value without new features. Ship ONE
drop in the first month post-launch to test the muscle before committing
to the cadence.

## Physical sigil mementos (fast follow — watch destroy-rate data)

At the destroy ritual's completion — the moment of peak feeling — offer a
**print of the user's own sigil**: linocut-styled, print-on-demand, framed
in-fiction as the **"closed case file."** One-time purchase, high emotional
value, zero ongoing dev cost, impossible for competitors to copy (the
artifact is user-generated). Gate the build on real destroy-rate data
post-launch; the offer slots into DestroyRitual's done-state
(see features/charge-destroy.md).

## Future revenue: partnerships (post-traction — these are sales, not ad inventory)

Ranked by fit. Common property: they pay off **after** traction; pre-launch
the only work is architectural (see "Sponsorship-readiness" below).

1. **Sponsored places on the map** (the Niantic/Pokémon GO playbook): local
   businesses pay to be **sanctified sites / charging grounds** — charging a
   sigil while physically there grants a unique glow / rare ring / "witnessed
   by The Office" mark. Business gets foot traffic; user gets a gift, not an
   interruption; the fiction absorbs it ("The Office maintains relationships
   with certain establishments"). Starts manual: a handful of local witchy
   cafés/bookstores at ~$50/mo each — which doubles as local marketing.
2. **The supply cabinet** (curated affiliate commerce): an in-fiction page in
   the Grimoire — a small, genuinely curated shelf (journals, candles, tarot
   decks, art supplies) via affiliate links. User-initiated, no ad networks,
   zero aesthetic damage; curation reinforces the brand. Viable early — no
   minimum scale needed.
3. **Sponsored cosmetic drops** (Fortnite model): a brand underwrites a
   seasonal collection. Needs tens of thousands of MAU before brands care;
   ruthless curation required. Year-two-if-things-go-well.

**Considered and rejected — rewarded video:** the only programmatic format
that doesn't structurally fight the design (user-initiated), but creative
quality is uncontrollable next to the ritual aesthetic, and RPMs at launch
scale are coffee money. Skip unless at significant scale and desperate.

### Sponsorship-readiness (cheap M4 decision, big option value)
Model map locations as a first-class **`Place`** concept (sigils attach to a
Place; Place can later carry `sponsorId`, perks, art overrides) instead of
raw lat/lng on the Sigil row — so sponsored sites are a column, not a
rewrite. Tracked as an open question in features/map.md; decide at M4.

## Never monetize
- **Charging and destroying** — the rituals are the soul; gate them and the app dies.
- **Votes / community energy** — paid boosts corrupt the one social currency.
- **Banner/display ads** — at our scale they earn pennies and vandalize an
  aesthetic that *is* the product.

## Architecture (the part to get right early)
- **Stripe is the source of truth for billing; `Entitlement` is the source
  of truth for permissions.** App code calls `lib/entitlements.ts`
  (`getSlotLimit(userId)`, `hasPremiumStyles(userId)`) and never reads
  Subscription/Stripe directly. (This indirection is also what makes the
  Founder tier and promo grants free to implement.)
- `POST /api/stripe/checkout` → Checkout session (plan → price ID env-mapped;
  M7 adds the one-time Founder price alongside the subscription prices).
- `POST /api/stripe/webhook` → verify signature; on
  `checkout.session.completed`, `customer.subscription.updated|deleted`:
  upsert Subscription, recompute Entitlements. Idempotent.
- Slot enforcement: `POST /api/sigils` checks
  `activeSigilCount < getSlotLimit(userId)` → `LIMIT_REACHED`.
- À la carte cosmetics (drops, prints) are one-time Stripe prices granting
  Entitlement rows (`source: SUBSCRIPTION` vs `GRANT` may gain a `PURCHASE`
  value at M7 — decide then, schema change is one enum value).

## Components & routes
- `app/(app)/premium/page.tsx` — plan comparison (incl. Founder while
  available), checkout launch, manage (Stripe billing portal link).
- `premium/UpgradeCard`, `premium/SlotMeter` (slots used/total — also shown
  in make-sigil when near cap), `premium/PaywallGate` (wraps premium-only UI
  with an in-fiction upsell).

## Data
Subscription + Entitlement models — see DATA_MODEL.md. Webhook is the only
writer of both.

## Acceptance criteria (M7)
- [ ] Test-mode purchase → slots increase without redeploy or manual step.
- [ ] Subscription cancel → entitlements revert at period end (not instantly).
- [ ] Webhook is idempotent (Stripe retries) and signature-verified.
- [ ] No premium check ever happens client-side only.
- [ ] Founder tier purchasable while capped quantity remains; cap enforced server-side.

## Open questions
- Final price points + yearly discount % (re-validate comps at M7 kickoff);
  free trial or not (lean: no trial, generous free tier IS the trial).
- Founder tier cap quantity and exact price ($49? $59?).
- What happens to sigils 13–36 if premium lapses? (Lean: they lock —
  visible, not chargeable — never deleted.)
- Print-on-demand vendor + unit economics for sigil mementos (fast-follow
  decision, post-launch).
- Entitlement `source` enum: add `PURCHASE` for à la carte? (decide at M7)
