/**
 * Premium — plan comparison and checkout.
 * STATUS: implemented (M7)
 * Route: /premium
 *
 * Server component: reads current plan + entitlements, passes to client
 * components. Checkout flow is handled by UpgradeCard → POST /api/stripe/checkout.
 * In-fiction framing: "The Office" caseload metaphor.
 *
 * @see docs/features/monetization.md
 */
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSlotLimit } from "@/lib/entitlements";
import { SlotMeter } from "@/components/premium/SlotMeter";
import { UpgradeCard } from "@/components/premium/UpgradeCard";

export const metadata = {
  title: "Premium — SigiLife",
  description: "Expand your caseload at The Office.",
};

export default async function PremiumPage() {
  const userId = await getCurrentUserId();

  // Fetch subscription + slot data in parallel.
  const [sub, slotLimit, activeSigilCount] = await Promise.all([
    prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true },
    }),
    getSlotLimit(userId),
    prisma.sigil.count({ where: { userId, status: "ACTIVE" } }),
  ]);

  const currentPlan = (sub?.plan ?? "FREE") as "FREE" | "PREMIUM";

  return (
    <main className="min-h-dvh bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
            The Office — Premium
          </h1>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            The Office maintains a limited number of active cases per agent.
            Your caseload determines how many intentions you can hold at once.
            Premium agents carry a heavier load.
          </p>
        </div>

        {/* Slot meter */}
        <SlotMeter used={activeSigilCount} limit={slotLimit} />

        {/* Upgrade / manage card */}
        <UpgradeCard currentPlan={currentPlan} />

        {/* Flavor text */}
        <p className="text-xs text-zinc-600 text-center leading-relaxed">
          The Office grants expanded caseloads to agents who support the work.
          Your sigils remain yours — canceling returns you to the standard 12, but
          destroys nothing. Free slots always remain available.
        </p>
      </div>
    </main>
  );
}
