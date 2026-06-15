"use client";

/**
 * UpgradeCard — premium plan pitch + checkout launcher.
 * STATUS: implemented (M7)
 *
 * Props: { currentPlan: "FREE" | "PREMIUM" }
 * Free → comparison table + checkout CTA.
 * Premium → confirmation + manage subscription link.
 *
 * @see docs/features/monetization.md
 */
import { useState } from "react";

interface UpgradeCardProps {
  currentPlan: "FREE" | "PREMIUM";
}

function CheckIcon() {
  return (
    <svg
      className="size-4 text-violet-400 shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="size-4 text-zinc-600 shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const COMPARISON_ROWS = [
  { label: "Sigil slots", free: "12 active", premium: "36 active" },
  {
    label: "Styles",
    free: "Base glyphs",
    premium: "Premium glows + rings",
  },
  {
    label: "Grimoire skin",
    free: "Standard",
    premium: "Premium skins",
  },
] as const;

export function UpgradeCard({ currentPlan }: UpgradeCardProps) {
  const [loading, setLoading] = useState(false);

  if (currentPlan === "PREMIUM") {
    return (
      <div className="rounded-xl border border-violet-800/40 bg-zinc-900 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✦</span>
          <div>
            <p className="text-zinc-100 font-semibold">You&apos;re on Premium.</p>
            <p className="text-sm text-zinc-400">Your caseload is expanded to 36 active sigils.</p>
          </div>
        </div>
        <a
          href="/api/stripe/portal"
          className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition"
        >
          Manage subscription →
        </a>
      </div>
    );
  }

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "PREMIUM" }),
      });
      const json = await res.json() as { data?: { url?: string }; error?: { message: string } };
      if (json.data?.url) {
        window.location.href = json.data.url;
      } else {
        console.error("Checkout error:", json.error);
        setLoading(false);
      }
    } catch (e) {
      console.error("Checkout fetch failed:", e);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <h2 className="text-zinc-100 font-semibold text-lg">
          Expand your caseload at The Office
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Upgrade to carry more active sigils and unlock premium styling.
        </p>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider w-1/3">
                Feature
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-zinc-500 uppercase tracking-wider w-1/3">
                Agent (Free)
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-violet-400 uppercase tracking-wider w-1/3">
                Expanded Caseload ✦
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-zinc-800/60">
                <td className="px-6 py-3 text-zinc-300">{row.label}</td>
                <td className="px-4 py-3 text-center text-zinc-500 flex-col">
                  <span className="flex items-center justify-center gap-1.5">
                    <LockIcon />
                    {row.free}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-zinc-200">
                  <span className="flex items-center justify-center gap-1.5">
                    <CheckIcon />
                    {row.premium}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing + CTA */}
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-zinc-100">$3.99</span>
          <span className="text-sm text-zinc-400">/month</span>
          <span className="text-xs text-zinc-500 ml-2">or $24.99/year (save 48%)</span>
        </div>

        <button
          type="button"
          onClick={handleUpgrade}
          disabled={loading}
          className={
            "w-full rounded-lg px-4 py-3 text-sm font-semibold transition " +
            (loading
              ? "bg-violet-800 text-violet-300 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700")
          }
        >
          {loading ? "Opening checkout…" : "Upgrade — $3.99/mo"}
        </button>

        <p className="text-xs text-zinc-600 text-center">
          Billed via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
