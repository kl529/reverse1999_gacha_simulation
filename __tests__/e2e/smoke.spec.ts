import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage should load successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for page to fully load
    await page.waitForLoadState("domcontentloaded");

    // Check that the page has the expected title
    // App title is "vertin's suitcase" or Korean equivalent
    await expect(page).toHaveTitle(/버틴|여행가방|가챠|reverse|1999/i);
  });

  test("gacha simulator page should be accessible", async ({ page }) => {
    await page.goto("/gacha_simulator");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // Verify page loaded by checking for simulator-related content
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });
  });
});
