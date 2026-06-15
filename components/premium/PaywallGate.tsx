"use client";

/**
 * PaywallGate — wraps premium-only UI with an in-fiction upsell.
 * STATUS: implemented (M7)
 *
 * The entitlement check is done server-side; the result is passed as a prop.
 * This component only renders or blocks — it never calls lib/entitlements.
 *
 * Props: { hasPremium: boolean; children: React.ReactNode; fallback?: React.ReactNode }
 *
 * @see docs/features/monetization.md
 */
import React from "react";
import Link from "next/link";

interface PaywallGateProps {
  hasPremium: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function DefaultLock() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-8 text-center">
      <span className="text-3xl" role="img" aria-label="Locked">
        🔒
      </span>
      <p className="text-sm font-medium text-zinc-300">Premium feature</p>
      <Link
        href="/premium"
        className="text-sm text-violet-400 underline hover:text-violet-300 transition"
      >
        Expand your caseload →
      </Link>
    </div>
  );
}

export function PaywallGate({ hasPremium, children, fallback }: PaywallGateProps) {
  if (hasPremium) return <>{children}</>;
  return <>{fallback ?? <DefaultLock />}</>;
}
