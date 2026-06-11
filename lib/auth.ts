/**
 * auth — Auth.js (NextAuth v5) configuration.
 * STATUS: stub
 *
 * What goes here (M1):
 *   export const { handlers, auth, signIn, signOut } = NextAuth({
 *     adapter: PrismaAdapter(prisma),
 *     providers: [Google],            // AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET
 *     session: { strategy: "database" },
 *     callbacks: { session: attach user.id/username/isAdmin to session.user }
 *   });
 * Consumers: app/api/auth/[...nextauth]/route.ts re-exports handlers;
 * (app)/layout.tsx and route handlers call auth() for the session;
 * lib/api requireSession() wraps it.
 * Replaces v1's google-auth-library verification + express-session (ADR-003).
 *
 * v1 reference: git show main:server/routes/auth.routes.ts
 * @see docs/features/auth.md
 */
export {};
