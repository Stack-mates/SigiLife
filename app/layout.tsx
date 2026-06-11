/**
 * Root layout — wraps every page.
 * STATUS: stub
 *
 * What goes here (M1):
 * - <html lang="en"> with theme classes applied server-side from the session
 *   user (theme/colorTheme) to avoid a flash of wrong theme.
 * - Font loading (next/font/local for public/fonts, or @fontsource swap).
 * - <UserProvider> (context/UserProvider) providing the session user +
 *   client-side theme switching.
 * - Metadata: title template, description, icons.
 *
 * @see ARCHITECTURE.md (theming), docs/features/auth.md
 */
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SigiLife", template: "%s · SigiLife" },
  description:
    "Distill your intentions into sigils. Place them in the world. Charge them with feeling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
