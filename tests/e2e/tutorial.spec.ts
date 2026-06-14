import { test, expect } from "@playwright/test";

/**
 * Tutorial — first /home visit greets the user; Skip dismisses it and the
 * choice persists across reloads (localStorage until the DB stores it).
 * Each Playwright test starts with a clean context, so this is a true
 * first-visit every run.
 * @see docs/features/tutorial.md
 */
test("intro shows on first visit, skips, and stays gone", async ({ page }) => {
  await page.goto("/home");

  const skip = page.getByRole("button", { name: "Skip" });
  await expect(skip).toBeVisible();

  await skip.click();
  await expect(skip).toHaveCount(0);

  await page.reload();
  await expect(page.getByRole("button", { name: "Skip" })).toHaveCount(0);
});
