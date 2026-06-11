/**
 * Landing page — public entry point.
 * STATUS: stub
 * Route: /
 *
 * What goes here (M1):
 * - The pitch: app name, tagline, a short carousel of what SigiLife is
 *   (v1 had an Embla carousel of pitch cards — port the copy, simplify the UI).
 * - <GoogleSignInButton> (components/auth) launching Auth.js Google sign-in.
 * - Server-side: if a session exists, redirect("/home") — or
 *   redirect("/create-profile") when user.username is null.
 * - Full-bleed Lino art background (public/art), glasscard content panel.
 *
 * v1 reference: git show main:src/components/LogInAuth/LandingPage.tsx
 * @see docs/features/auth.md, docs/PRODUCT_SPEC.md
 */
export default function LandingPage() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <h1 className="text-3xl">SigiLife</h1>
    </main>
  );
}
