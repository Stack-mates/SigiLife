/**
 * (app) layout — THE auth gate for the whole signed-in app.
 * STATUS: stub
 *
 * What goes here (M1):
 * - Server-side session check via lib/auth.ts:
 *     no session            → redirect("/")
 *     session, no username  → redirect("/create-profile")
 *   This single gate replaces v1's per-route <ProtectedRoute> wrapper.
 * - Mounts the global chrome: <Menu> (components/layout) and
 *   <TutorialProvider> + <TutorialOverlay> (M6 — dynamic import, only for
 *   users with hasCompletedTutorial === false).
 *
 * v1 reference: git show main:src/components/LogInAuth/ProtectedRoute.tsx
 * @see docs/features/auth.md, ARCHITECTURE.md (route groups)
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
