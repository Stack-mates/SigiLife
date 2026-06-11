import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The 8th Wall AR engine (public/xr) requires SharedArrayBuffer, which in
  // turn requires cross-origin isolation. These headers are scoped to the AR
  // route only so the rest of the app is unaffected.
  // See docs/features/ar.md before changing.
  async headers() {
    return [
      {
        source: "/ar/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
