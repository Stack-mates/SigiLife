/**
 * Premium — plan comparison and checkout.
 * STATUS: stub
 * Route: /premium
 *
 * What goes here (M7):
 * - Server component: current plan + entitlements via lib/entitlements.
 * - <UpgradeCard> (components/premium): free vs premium table (slots 12→36,
 *   premium styles, book skins — pricing per docs/features/monetization.md),
 *   checkout button → POST /api/stripe/checkout → redirect to Stripe.
 * - Existing subscribers: link to Stripe billing portal instead.
 * - In-fiction framing: "expand your caseload at The Office".
 *
 * @see docs/features/monetization.md
 */
export default function PremiumPage() {
  return <main className="p-8">premium (stub)</main>;
}
