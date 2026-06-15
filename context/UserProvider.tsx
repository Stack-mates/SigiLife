"use client";

/**
 * UserProvider — session user + theme application.
 * STATUS: implemented
 *
 * - Receives the session user from the server (initialUser prop from the root
 *   layout — no client fetch on boot like v1's /api/auth/me roundtrip).
 * - Applies theme classes to <html>: .dark per user.theme (default DARK),
 *   .theme-foliage / .theme-cyber per user.colorTheme (default FOLIAGE);
 *   updates live whenever the user object changes (optimistic — ProfileForm
 *   calls setUser before its PATCH resolves so the preview is instant).
 * - useUser() hook: { user, setUser } for client components (Menu,
 *   ProfileForm, PaywallGate fallbacks).
 *
 * The root layout also renders these classes on <html> server-side, so the
 * first paint already matches; this provider keeps them in sync on the client.
 *
 * v1 reference: git show main:src/context/UserContext.tsx
 * @see docs/features/auth.md, ARCHITECTURE.md (theming)
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "LIGHT" | "DARK";
export type ColorTheme = "FOLIAGE" | "CYBER";

export type ContextUser = {
  id: string;
  username: string | null;
  avatar: number;
  theme: ThemeMode;
  colorTheme: ColorTheme;
};

type UserContextValue = {
  user: ContextUser | null;
  setUser: (next: ContextUser | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

/** Apply the theme/colorTheme classes to <html>. Defaults: DARK + FOLIAGE. */
function applyTheme(theme: ThemeMode | undefined, colorTheme: ColorTheme | undefined) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme !== "LIGHT"); // default DARK
  root.classList.toggle("theme-cyber", colorTheme === "CYBER");
  root.classList.toggle("theme-foliage", colorTheme !== "CYBER"); // default FOLIAGE
}

export function UserProvider({
  initialUser = null,
  children,
}: {
  initialUser?: ContextUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<ContextUser | null>(initialUser);

  // Re-apply whenever the relevant theme bits change. Optimistic setUser calls
  // (live preview) flow through here too, so the DOM updates immediately.
  useEffect(() => {
    applyTheme(user?.theme, user?.colorTheme);
  }, [user?.theme, user?.colorTheme]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
