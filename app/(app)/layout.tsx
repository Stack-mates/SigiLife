/**
 * (app) layout — global chrome for the signed-in app.
 * STATUS: partial — mounts the tutorial (M6). The server-side AUTH GATE
 * (no session → "/"; no username → "/create-profile") arrives with the
 * auth milestone (ADR-009: auth last); until then all (app) routes are open
 * and the app is local-first. <Menu> also lands with auth.
 *
 * v1 reference: git show main:src/components/LogInAuth/ProtectedRoute.tsx
 * @see docs/features/auth.md, docs/features/tutorial.md
 */
import { TutorialProvider } from "@/context/TutorialProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <TutorialProvider>{children}</TutorialProvider>;
}
