
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  username: string | null;
  email: string;
  name: string | null;
  picture: string | null;
  avatar: number;
  theme: number;
  color_theme: string;
  homeTeam: string;
  homeLocation: string | null;
  isAdmin: boolean;
  hasCompletedTutorial: boolean;
  sigilCount: number;
  destroyCount: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

function applyThemeClasses(theme: number, colorTheme: string) {
  const html = document.documentElement;
  html.classList.toggle("dark", theme === 1);
  html.classList.remove("theme-cyber", "theme-foliage");
  if (colorTheme === "foliage") html.classList.add("theme-foliage");
  if (colorTheme === "cyber") html.classList.add("theme-cyber");
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          applyThemeClasses(data.user.theme, data.user.color_theme);
        }
      })
      .catch(() => { })
      .finally(() => { setIsLoading(false); });
  }, []);

  useEffect(() => {
    if (user) applyThemeClasses(user.theme, user.color_theme);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("contextError!");
  return ctx;
}