/**
 * UpgradeCard — the premium plan pitch + checkout launcher.
 * STATUS: stub · "use client" (M7)
 *
 * Props (planned): { currentPlan: Plan }
 * Free vs Premium comparison (slots 12→36, premium styles, book skins —
 * pricing table in docs/features/monetization.md). CTA →
 * POST /api/stripe/checkout → window.location = url. Subscribers see
 * "manage subscription" (billing portal) instead.
 *
 * @see docs/features/monetization.md
 */
export function UpgradeCard() {
  return <div>UpgradeCard (stub)</div>;
}
