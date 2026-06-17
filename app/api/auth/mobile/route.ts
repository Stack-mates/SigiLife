/**
 * /api/auth/mobile — native sign-in token exchange.
 * STATUS: implemented (mobile auth path; web uses the Auth.js cookie session)
 *
 * POST {idToken}: a native app does Google sign-in on-device, then posts the
 * resulting Google **ID token** here. We verify it with Google's tokeninfo
 * endpoint (no crypto dep needed), check the audience is one of our OAuth
 * clients, upsert the user (same email key the Prisma adapter uses), and mint
 * an app Bearer JWT (lib/mobile-token) the app sends on every API call.
 *
 * Allowed audiences: AUTH_GOOGLE_ID (web) plus optional GOOGLE_IOS_CLIENT_ID /
 * GOOGLE_ANDROID_CLIENT_ID when the native OAuth clients exist.
 *
 * @see docs/API_CONTRACT.md, docs/features/auth.md, lib/mobile-token.ts
 */
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok, err, parse } from "@/lib/api";
import { mintMobileToken } from "@/lib/mobile-token";

const bodySchema = z.object({ idToken: z.string().min(1) });

type TokenInfo = {
  aud?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
};

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = parse(bodySchema, json);
  if (!parsed.ok) return parsed.response;

  // Verify the Google ID token (validates signature + expiry server-side).
  let info: TokenInfo;
  try {
    const res = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(parsed.data.idToken)}`,
    );
    if (!res.ok) return err("UNAUTHORIZED", "Invalid Google token");
    info = (await res.json()) as TokenInfo;
  } catch {
    return err("INTERNAL", "Could not verify token with Google");
  }

  const allowedAudiences = [
    process.env.AUTH_GOOGLE_ID,
    process.env.GOOGLE_IOS_CLIENT_ID,
    process.env.GOOGLE_ANDROID_CLIENT_ID,
  ].filter(Boolean);
  if (!info.aud || !allowedAudiences.includes(info.aud)) {
    return err("UNAUTHORIZED", "Token audience mismatch");
  }
  if (!info.email) return err("UNAUTHORIZED", "Google token has no email");

  // Upsert by email — the same key the Prisma adapter uses for web sign-in, so
  // a user who signs in on web and mobile is one account.
  const user = await prisma.user.upsert({
    where: { email: info.email },
    update: {},
    create: { email: info.email, name: info.name ?? null, image: info.picture ?? null },
  });

  const token = await mintMobileToken({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });

  return ok({
    token,
    user: { id: user.id, username: user.username },
    // username === null ⇒ the app should route into onboarding (/create-profile).
  });
}
