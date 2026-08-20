import { test, expect } from "@playwright/test";

test.describe("ForgeHub Navigation & Authentication Overhaul", () => {
  // We need to bypass the actual Supabase login flow if we don't have seeded credentials
  // For this test, we will verify the structure and routing rules.
  
  test("Public pages are accessible without authentication", async ({ page }) => {
    await page.goto("/");
    // Should see the marketing navbar with Log in and Start Forging buttons
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Forging" })).toBeVisible();

    await page.goto("/explore");
    await expect(page.getByRole("heading", { name: "Explore" })).toBeVisible();
  });

  test("Protected pages redirect to login with redirectTo param", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/.*\/login\?redirectTo=\/dashboard/);

    await page.goto("/settings/profile");
    await expect(page).toHaveURL(/.*\/login\?redirectTo=\/settings\/profile/);
  });

  test("Theme toggle cycles through modes", async ({ page }) => {
    await page.goto("/");
    
    const themeBtn = page.getByRole("button", { name: /Current theme is/i });
    await expect(themeBtn).toBeVisible();
    
    // Default is usually 'system' or 'dark' based on our new logic
    const initialAria = await themeBtn.getAttribute("aria-label");
    
    await themeBtn.click();
    const newAria = await themeBtn.getAttribute("aria-label");
    
    expect(initialAria).not.toEqual(newAria);
  });

  // Note: Full authenticated flow testing requires seeding a test user in Supabase.
  // We'll stub this test to demonstrate the intended behavior.
  test.skip("Authenticated user can visit public landing page without forced dashboard redirect", async ({ page }) => {
    // 1. Log in via UI
    // 2. Navigate to "/"
    // 3. Expect URL to remain "/"
    // 4. Expect Navbar to show "Dashboard" button instead of "Log in"
  });

  test.skip("Account deletion flow shows danger confirmation modal", async ({ page }) => {
    // 1. Log in
    // 2. Navigate to /settings/account
    // 3. Click "Delete Account"
    // 4. Expect confirmation modal to be visible
    // 5. Expect "Permanently Delete" button inside modal
  });
});
