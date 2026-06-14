import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E config.
 * Drives the real app in chromium. Reuses an already-running dev server on
 * :3001 if present (the one we keep up for phone testing), else starts one.
 * Requires the Postgres container up (docker compose up -d db).
 *
 * Run: npm run test:e2e   ·   see docs/CONVENTIONS.md (testing policy)
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // shared dev DB — keep flows from racing each other
  workers: 1,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://localhost:3001",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    // Rituals' WebGL (SplashCursor/EvilEye) is flaky headless; both honor
    // reduced-motion by skipping WebGL, so this exercises the ritual FLOW
    // (pick → complete → persist) deterministically. Visuals need a human.
    reducedMotion: "reduce",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev -- -H 0.0.0.0 -p 3001",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
