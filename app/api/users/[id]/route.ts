/**
 * /api/users/[id] — one user.
 * STATUS: stub
 *
 * GET    (M3): public profile — username, avatar, counts, follow state.
 * PATCH  (M1): self only (updateUserSchema): username (unique → CONFLICT),
 *   avatar, theme, colorTheme, homeLocation, hasCompletedTutorial.
 *   This is also the onboarding completion call from /create-profile.
 * DELETE (M1): self only — account deletion, prisma cascades handle the rest.
 *   Confirm flow lives in settings UI.
 *
 * v1 reference: git show main:server/routes/user.routes.ts
 * @see docs/API_CONTRACT.md, docs/features/auth.md
 */
import { notImplemented } from "@/lib/api";

export async function GET() {
  return notImplemented("GET /api/users/[id]");
}

export async function PATCH() {
  return notImplemented("PATCH /api/users/[id]");
}

export async function DELETE() {
  return notImplemented("DELETE /api/users/[id]");
}
