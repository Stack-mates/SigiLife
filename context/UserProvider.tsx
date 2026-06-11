"use client";

/**
 * UserProvider — session user + theme application.
 * STATUS: stub (renders children; context wiring lands M1)
 *
 * What goes here (M1):
 * - Receives the session user from the server (prop from root layout — no
 *   client fetch on boot like v1's /api/auth/me roundtrip).
 * - Applies theme classes to <html>: .dark per user.theme,
 *   .theme-foliage / .theme-cyber per user.colorTheme; updates live when
 *   settings change (optimistic, before the PATCH resolves).
 * - useUser() hook: { user, setUser } for client components (Menu,
 *   ProfileForm, PaywallGate fallbacks).
 *
 * v1 reference: git show main:src/context/UserContext.tsx
 * @see docs/features/auth.md, ARCHITECTURE.md (theming)
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
