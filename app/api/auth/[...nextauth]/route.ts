/**
 * Auth.js route handler — all of /api/auth/* (signin, callback, session…).
 * STATUS: implemented
 *
 * Re-exports the handlers from lib/auth.ts (Google provider, JWT sessions).
 * Replaces v1's POST /api/auth/google + GET /api/auth/me + express-session.
 *
 * @see docs/features/auth.md, docs/API_CONTRACT.md, lib/auth.ts
 */
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
