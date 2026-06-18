import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E config.
 * Drives the real app in chromium on a DEDICATED port :3001 — deliberately
 * separate from the `npm run dev` / browser-review / phone-testing server on
 * :3000, so E2E doesn't fight live browser tabs over the shared dev DB or
 * on-demand compilation. Normally nothing else is on :3001, so this spawns its
 * own clean server; reuse kicks in only if you already started one there.
 * Requires the Postgres container up (docker compose up -d db).
 *
 * Run: pnpm test:e2e   ·   see docs/CONVENTIONS.md (testing policy)
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
    command: "pnpm exec next dev -H 0.0.0.0 -p 3001",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
