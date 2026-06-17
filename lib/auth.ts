/**
 * auth — Auth.js (NextAuth v5) + current-user resolution.
 * STATUS: implemented (real Google auth with a dev-identity fallback)
 *
 * Real auth landed (M1, ADR-016): Google provider, PrismaAdapter, JWT session
 * strategy (one token serves web cookies AND the mobile Bearer path). The
 * session carries { id, username, isAdmin }; username presence == onboarded.
 *
 * Resolution model — callers never changed:
 *   getCurrentUserId() → real session user if signed in; otherwise the dev
 *   shim user, UNLESS process.env.AUTH_ENFORCED === "true" (prod), where the
 *   absence of a session throws UNAUTHORIZED. The fallback keeps local dev and
 *   E2E running credential-less; flip AUTH_ENFORCED in prod to require login.
 *
 * The mobile Bearer path lives in lib/api requireViewer() (it reads the
 * Authorization header, which server-side auth() does not).
 *
 * @see docs/features/auth.md, docs/DECISIONS.md (ADR-016), types/next-auth.d.ts
 */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  callbacks: {
    // First sign-in seeds the token from the adapter's user row; thereafter we
    // re-read username/isAdmin so onboarding completion reflects immediately.
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (token.id) {
        const u = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { username: true, isAdmin: true },
        });
        token.username = u?.username ?? null;
        token.isAdmin = u?.isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      session.user.username = (token.username as string | null) ?? null;
      session.user.isAdmin = (token.isAdmin as boolean) ?? false;
      return session;
    },
  },
});

// ── Current-user resolution (callers: server actions, route handlers) ────────

const DEV_USER_EMAIL = "dev@sigilife.local";
let cachedDevUserId: string | null = null;

/** Whether the dev-identity fallback is allowed (off in enforced/prod mode). */
function devFallbackAllowed(): boolean {
  return process.env.AUTH_ENFORCED !== "true";
}

/** The dev shim user (created on first use). Only reached when not enforced. */
async function getDevUserId(): Promise<string> {
  if (cachedDevUserId) return cachedDevUserId;
  const user = await prisma.user.upsert({
    where: { email: DEV_USER_EMAIL },
    update: {},
    create: { email: DEV_USER_EMAIL, name: "Agent", username: "agent" },
  });
  cachedDevUserId = user.id;
  return user.id;
}

/**
 * Resolve the acting user's id: the real session user if signed in, else the
 * dev shim (unless AUTH_ENFORCED). Throws "UNAUTHORIZED" when enforced and
 * there is no session — callers in route handlers map that to a 401.
 */
export async function getCurrentUserId(): Promise<string> {
  const session = await auth();
  if (session?.user?.id) return session.user.id;
  if (devFallbackAllowed()) return getDevUserId();
  throw new Error("UNAUTHORIZED");
}

/**
 * The acting user's profile fields needed by the root layout / UserProvider to
 * apply theming server-side and seed client context. Read-only summary.
 */
export type CurrentUser = {
  id: string;
  username: string | null;
  avatar: number;
  theme: "LIGHT" | "DARK";
  colorTheme: "FOLIAGE" | "CYBER";
};

/** Resolve the acting user's profile summary (real session user or dev shim). */
export async function getCurrentUser(): Promise<CurrentUser> {
  const id = await getCurrentUserId();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { id: true, username: true, avatar: true, theme: true, colorTheme: true },
  });
  return user;
}
