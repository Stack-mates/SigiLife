/**
 * GoogleSignInButton — launches Auth.js Google sign-in.
 * STATUS: stub · "use client" when implemented
 *
 * What goes here (M1): a styled button calling signIn("google",
 * { callbackUrl: "/home" }) from next-auth/react. The (app) gate handles
 * the create-profile redirect for new users. No custom OAuth code — that
 * was v1 (GoogleAuth.tsx); Auth.js owns the flow now (ADR-003).
 *
 * @see docs/features/auth.md
 */
export function GoogleSignInButton() {
  return <button type="button">Sign in with Google</button>;
}
