/**
 * Dev visual-review tool: capture screenshots of key pages so they can be
 * eyeballed (a human, or an agent via an image-capable read tool).
 *
 * Prereqs: dev server running (npm run dev) + Postgres up.
 * Usage:   SIGIL_ID=<id> node scripts/screenshots.mjs
 *          BASE=http://localhost:3000 VIEWPORT=mobile node scripts/screenshots.mjs
 * Output:  /tmp/sigishots/*.png
 *
 * @see docs/CONVENTIONS.md (visual review)
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";

const OUT = "/tmp/sigishots";
const BASE = process.env.BASE ?? "http://localhost:3000";
const SIGIL_ID = process.env.SIGIL_ID ?? "";
const viewport =
  process.env.VIEWPORT === "desktop"
    ? { width: 1280, height: 900 }
    : { width: 390, height: 844 };

mkdirSync(OUT, { recursive: true });

const shots = [
  ["landing", "/"],
  ["home-with-tutorial", "/home"],
  ["write-step", "/make-sigil/write"],
  ["library", "/grimoire/library"],
  ["profile", "/grimoire/profile"],
  ["settings", "/grimoire/settings"],
  ...(SIGIL_ID ? [["sigil-page", `/grimoire/sigil/${SIGIL_ID}`]] : []),
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });

for (const [name, path] of shots) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  if (path === "/make-sigil/write") {
    await page.getByRole("textbox").fill("I move through this season with steady hands");
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("captured", name);
}

await browser.close();
