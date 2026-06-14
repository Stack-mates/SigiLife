/**
 * auth — current-user resolution.
 * STATUS: dev-identity shim (Google auth + real sessions are the LAST
 * milestone, ADR-009). Everything that needs "who is this" calls
 * getCurrentUserId(); when real auth lands, only THIS function changes —
 * callers stay the same.
 *
 * For now there are no accounts: a single fixed dev user owns everything,
 * created on first use. This lets the whole app run against a real database
 * before login exists.
 *
 * What replaces this (auth milestone):
 *   export const { handlers, auth, signIn, signOut } = NextAuth({ ... });
 *   getCurrentUserId() → (await auth())?.user?.id
 *
 * @see docs/features/auth.md, docs/DECISIONS.md (ADR-009)
 */
import { prisma } from "@/lib/prisma";

const DEV_USER_EMAIL = "dev@sigilife.local";

let cachedDevUserId: string | null = null;

/** Resolve the acting user's id, creating the dev user on first use. */
export async function getCurrentUserId(): Promise<string> {
  if (cachedDevUserId) return cachedDevUserId;
  const user = await prisma.user.upsert({
    where: { email: DEV_USER_EMAIL },
    update: {},
    create: { email: DEV_USER_EMAIL, name: "Agent", username: "agent" },
  });
  cachedDevUserId = user.id;
  return user.id;
}
