/**
 * Root layout — wraps every page.
 * STATUS: implemented
 *
 * - <html lang="en"> with theme classes applied server-side from the current
 *   user (theme/colorTheme) to avoid a flash of wrong theme on first paint.
 * - <UserProvider> (context/UserProvider) seeded with that same user, providing
 *   the session user + client-side theme switching (live preview in settings).
 * - Metadata: title template, description.
 *
 * @see ARCHITECTURE.md (theming), docs/features/auth.md
 */
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserProvider";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SigiLife", template: "%s · SigiLife" },
  description:
    "Distill your intentions into sigils. Place them in the world. Charge them with feeling.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Mirror UserProvider's class logic server-side so the first paint already
  // matches the user's theme. Defaults: DARK + FOLIAGE.
  const htmlClass = [
    user.theme !== "LIGHT" ? "dark" : "",
    user.colorTheme === "CYBER" ? "theme-cyber" : "theme-foliage",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="en" className={htmlClass}>
      <body>
        <UserProvider initialUser={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
