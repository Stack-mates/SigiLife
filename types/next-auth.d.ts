/**
 * Auth.js (NextAuth v5) type augmentation.
 * STATUS: implemented
 *
 * Surfaces the fields the app reads off a session — id, username (presence ==
 * onboarded), isAdmin — on both the Session and the JWT (we use the JWT
 * session strategy so one token serves web cookies and the mobile Bearer
 * path, ADR-016). `username: null` means onboarding isn't complete yet.
 *
 * @see lib/auth.ts, docs/features/auth.md
 */
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    isAdmin: boolean;
  }
}
