/**
 * Auth.js route handler — all of /api/auth/* (signin, callback, session…).
 * STATUS: stub
 *
 * What goes here (M1): re-export the handlers from lib/auth.ts:
 *   import { handlers } from "@/lib/auth";
 *   export const { GET, POST } = handlers;
 * Replaces v1's POST /api/auth/google + GET /api/auth/me + express-session.
 *
 * v1 reference: git show main:server/routes/auth.routes.ts
 * @see docs/features/auth.md, docs/API_CONTRACT.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("/api/auth/[...nextauth]");
}

export async function POST() {
  return notImplemented("/api/auth/[...nextauth]");
}
