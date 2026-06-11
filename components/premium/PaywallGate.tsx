/**
 * PaywallGate — wraps premium-only UI with an in-fiction upsell.
 * STATUS: stub · "use client" (M7)
 *
 * Props (planned): { entitlement: "premium_styles" | ...; children;
 * fallback?: React.ReactNode }
 * If the viewer holds the entitlement (passed down from a server component
 * that called lib/entitlements — the check itself is NEVER client-only),
 * render children; else render the upsell (lock treatment + link /premium).
 *
 * @see docs/features/monetization.md
 */
export function PaywallGate({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
