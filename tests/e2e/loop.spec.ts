import { test, expect } from "@playwright/test";

/**
 * Core loop — the whole journey against the real DB:
 * write → draw → style → keep → library → charge → destroy → closed cases.
 * Uses a unique name so it's deterministic despite shared dev data.
 * Rituals complete via the "finish now" affordance (reducedMotion skips WebGL).
 * @see docs/CONVENTIONS.md, docs/features/charge-destroy.md
 */
test("create, charge, and destroy a sigil end to end", async ({ page }) => {
  const name = `E2E ${Date.now()}`;

  // ── write ──
  await page.goto("/make-sigil/write");
  await page.getByRole("textbox").fill("strength and clarity");
  await page.getByRole("button", { name: /begin drawing/i }).click();

  // ── draw ── wait for the editor to seed letterforms, then continue
  await expect(page).toHaveURL(/\/make-sigil\/draw/);
  const continueBtn = page.getByRole("button", { name: /continue/i });
  await expect(continueBtn).toBeEnabled({ timeout: 30_000 });
  await continueBtn.click();

  // ── style ── name + keep (saves to DB)
  await expect(page).toHaveURL(/\/make-sigil\/style/);
  await page.getByPlaceholder("Name your sigil…").fill(name);
  await page.getByRole("button", { name: /keep this sigil/i }).click();
  await page.getByRole("button", { name: /open library/i }).click();

  // ── library ── the new sigil is there
  await expect(page).toHaveURL(/\/grimoire\/library/);
  await expect(page.getByText(name)).toBeVisible();

  // open it
  await page.getByText(name).click();
  await expect(page).toHaveURL(/\/grimoire\/sigil\//);

  // ── vote (community energy) ── toggling the charge vote bumps the score
  const chargeVote = page.getByRole("button", { name: /vote to charge/i });
  await chargeVote.click();
  await expect(chargeVote).toContainText("1");

  // ── charge ──
  await page.getByRole("link", { name: /charge/i }).click();
  await expect(page).toHaveURL(/\/charge-sigil\//);
  await page.getByRole("button", { name: "Hope" }).click();
  await page.getByRole("button", { name: /finish now/i }).click();
  await expect(page.getByText(/charged with hope/i)).toBeVisible();

  // back to the sigil — charged badge persisted
  await page.getByRole("link", { name: /view sigil/i }).click();
  await expect(page.getByText(/charged with hope/i)).toBeVisible();

  // ── destroy ──
  await page.getByRole("link", { name: /destroy/i }).click();
  await expect(page).toHaveURL(/\/destroy-sigil\//);
  await page.getByRole("button", { name: /begin the rite/i }).click();
  await page.getByRole("button", { name: "Grief" }).click();
  await page.getByRole("button", { name: /finish now/i }).click();

  // ── closed cases ── it landed here, and is gone from the active library
  await expect(page).toHaveURL(/view=completed/);
  await expect(page.getByText(name)).toBeVisible();
  await page.goto("/grimoire/library");
  await expect(page.getByText(name)).toHaveCount(0);
});
