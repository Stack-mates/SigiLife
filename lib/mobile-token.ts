/**
 * mobile-token — mint/verify the Bearer JWT native apps use to call the API.
 * STATUS: implemented (web uses cookie sessions; native uses these Bearer JWTs)
 *
 * Self-contained app tokens signed with AUTH_SECRET under a fixed salt — NOT
 * the Auth.js cookie session (that's web-only). The mobile flow: native Google
 * sign-in → POST /api/auth/mobile {idToken} → we verify with Google and mint
 * one of these → the app sends it as `Authorization: Bearer <token>` and
 * lib/api requireViewer() resolves the user from it.
 *
 * @see docs/features/auth.md, docs/DECISIONS.md (ADR-016), app/api/auth/mobile
 */
import { encode, decode } from "next-auth/jwt";

const SALT = "sigilife.mobile.session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is required to sign mobile tokens");
  return s;
}

export type MobileTokenClaims = {
  id: string;
  username: string | null;
  isAdmin: boolean;
};

/** Sign a Bearer token for a native client. */
export async function mintMobileToken(claims: MobileTokenClaims): Promise<string> {
  return encode({ token: { ...claims }, secret: secret(), salt: SALT, maxAge: MAX_AGE });
}

/**
 * Resolve a user id from an `Authorization: Bearer <jwt>` header, or null if
 * the header is absent/malformed/invalid. Never throws.
 */
export async function viewerIdFromBearer(
  authorization: string | null,
): Promise<string | null> {
  if (!authorization?.startsWith("Bearer ")) return null;
  const token = authorization.slice("Bearer ".length).trim();
  if (!token) return null;
  try {
    const payload = await decode({ token, secret: secret(), salt: SALT });
    const id = payload?.id;
    return typeof id === "string" ? id : null;
  } catch {
    return null;
  }
}
