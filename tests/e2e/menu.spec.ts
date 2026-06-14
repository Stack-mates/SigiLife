import { test, expect } from "@playwright/test";

/**
 * Global menu — opens and navigates back to The Office from a deep page.
 * Runs from the library (no tutorial overlay there) so the toggle is clickable.
 * @see docs/COMPONENT_MAP.md
 */
test("menu navigates back to The Office", async ({ page }) => {
  await page.goto("/grimoire/library");
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("link", { name: "The Office" }).click();
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByRole("heading", { name: "The Office" })).toBeVisible();
});

test("menu stays out of the rituals", async ({ page }) => {
  await page.goto("/charge-sigil/anything");
  // On a ritual route the menu toggle is intentionally absent.
  await expect(page.getByRole("button", { name: "Menu" })).toHaveCount(0);
});
