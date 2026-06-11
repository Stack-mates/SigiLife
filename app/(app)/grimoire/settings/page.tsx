/**
 * Settings — account management.
 * STATUS: stub
 * Route: /grimoire/settings
 *
 * What goes here (M1):
 * - Form: avatar, theme (light/dark), colorTheme (foliage/cyber), home
 *   location, username (if we allow changes — open question in
 *   docs/features/auth.md). PATCH /api/users/[id] — good server-action
 *   candidate (if used, add an `(action)` row to API_CONTRACT).
 * - Replay tutorial button (resets hasCompletedTutorial — M6).
 * - Manage subscription → Stripe billing portal (M7).
 * - Danger zone: sign out; delete account (DELETE /api/users/[id], confirm flow).
 *
 * v1 reference: git show main:src/components/.../Profile/UserSettings.tsx
 * @see docs/features/auth.md
 */
export default function SettingsPage() {
  return <main className="p-8">settings (stub)</main>;
}
