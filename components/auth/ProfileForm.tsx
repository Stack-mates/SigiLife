/**
 * ProfileForm — the onboarding form (also reused by settings where sensible).
 * STATUS: stub · "use client" when implemented
 *
 * Props (planned): { user: UserSummary; mode: "onboarding" | "settings" }
 * Fields: username (live availability hint optional; CONFLICT on submit is
 * the source of truth), avatar picker (public avatar set), home location
 * (text until M4, then MapSearchBox), theme + colorTheme toggles with live
 * preview (UserProvider applies classes immediately).
 * Submit: PATCH /api/users/[id] → onboarding: router.push("/home").
 *
 * v1 reference: git show main:src/components/LogInAuth/CreateProfile.tsx
 * @see docs/features/auth.md
 */
export function ProfileForm() {
  return <form>profile form (stub)</form>;
}
