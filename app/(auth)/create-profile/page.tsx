/**
 * Create Profile — one-time onboarding after first Google sign-in.
 * STATUS: stub
 * Route: /create-profile · Auth: session required, username must be null
 *   (onboarded users are redirected to /home)
 *
 * What goes here (M1):
 * - <ProfileForm> (components/auth): username (unique, checked on submit),
 *   avatar picker (public/Avatar*.png set), home location (MapSearchBox in
 *   M4 — plain text field until then), theme + colorTheme choice.
 * - Submits PATCH /api/users/[id]; on success redirect to /home
 *   (tutorial will trigger there — docs/features/tutorial.md).
 *
 * v1 reference: git show main:src/components/LogInAuth/CreateProfile.tsx
 * @see docs/features/auth.md
 */
export default function CreateProfilePage() {
  return <main className="p-8">create-profile (stub)</main>;
}
