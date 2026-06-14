import { test, expect } from "@playwright/test";

/**
 * Smoke — every key page renders its expected content (not just a 200).
 * @see docs/CONVENTIONS.md
 */
test.describe("smoke", () => {
  test("landing", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /enter the office/i })).toBeVisible();
  });

  test("home hub", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("heading", { name: "The Office" })).toBeVisible();
    await expect(page.getByRole("link", { name: /write a sigil/i })).toBeVisible();
  });

  test("write step shows distilled characters live", async ({ page }) => {
    await page.goto("/make-sigil/write");
    await page.getByRole("textbox").fill("strength");
    // consonants of "strength" (vowels stripped): s t r n g h
    await expect(page.getByText("Distilled characters")).toBeVisible();
    await expect(page.getByRole("button", { name: /begin drawing/i })).toBeEnabled();
  });

  test("grimoire library renders", async ({ page }) => {
    await page.goto("/grimoire/library");
    await expect(page.getByRole("link", { name: "Library" })).toBeVisible();
  });
});
