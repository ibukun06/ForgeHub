# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-auth.spec.ts >> ForgeHub Navigation & Authentication Overhaul >> Protected pages redirect to login with redirectTo param
- Location: e2e\navigation-auth.spec.ts:17:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/login\?redirectTo=\/dashboard/
Received string:  "http://localhost:3000/login?redirectTo=%2Fdashboard"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en" class="inter_fe8b9d92-module__LINzvG__variable archivo_d976246c-module__pvw2IW__variable roboto_mono_a48da9b6-module__RNpGXW__variable h-full antialiased">…</html>
       - unexpected value "http://localhost:3000/login?redirectTo=%2Fdashboard"

```

```yaml
- link "ForgeHub Logo ForgeHub":
  - /url: /
  - img "ForgeHub Logo"
  - text: ForgeHub
- heading "Log in" [level=1]
- paragraph: Continue forging your engineering story.
- button "Continue with GitHub"
- button "Continue with Google"
- button "Continue with LinkedIn"
- text: or Email
- textbox "Email"
- text: Password
- textbox "Password"
- checkbox "Remember me" [checked]
- text: Remember me
- link "Forgot password?":
  - /url: /reset-password
- button "Log in"
- paragraph:
  - text: New to ForgeHub?
  - link "Create an account":
    - /url: /signup
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("ForgeHub Navigation & Authentication Overhaul", () => {
  4  |   // We need to bypass the actual Supabase login flow if we don't have seeded credentials
  5  |   // For this test, we will verify the structure and routing rules.
  6  |   
  7  |   test("Public pages are accessible without authentication", async ({ page }) => {
  8  |     await page.goto("/");
  9  |     // Should see the marketing navbar with Log in and Start Forging buttons
  10 |     await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
  11 |     await expect(page.getByRole("link", { name: "Start Forging" })).toBeVisible();
  12 | 
  13 |     await page.goto("/explore");
  14 |     await expect(page.getByRole("heading", { name: "Explore" })).toBeVisible();
  15 |   });
  16 | 
  17 |   test("Protected pages redirect to login with redirectTo param", async ({ page }) => {
  18 |     await page.goto("/dashboard");
> 19 |     await expect(page).toHaveURL(/.*\/login\?redirectTo=\/dashboard/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  20 | 
  21 |     await page.goto("/settings/profile");
  22 |     await expect(page).toHaveURL(/.*\/login\?redirectTo=\/settings\/profile/);
  23 |   });
  24 | 
  25 |   test("Theme toggle cycles through modes", async ({ page }) => {
  26 |     await page.goto("/");
  27 |     
  28 |     const themeBtn = page.getByRole("button", { name: /Current theme is/i });
  29 |     await expect(themeBtn).toBeVisible();
  30 |     
  31 |     // Default is usually 'system' or 'dark' based on our new logic
  32 |     const initialAria = await themeBtn.getAttribute("aria-label");
  33 |     
  34 |     await themeBtn.click();
  35 |     const newAria = await themeBtn.getAttribute("aria-label");
  36 |     
  37 |     expect(initialAria).not.toEqual(newAria);
  38 |   });
  39 | 
  40 |   // Note: Full authenticated flow testing requires seeding a test user in Supabase.
  41 |   // We'll stub this test to demonstrate the intended behavior.
  42 |   test.skip("Authenticated user can visit public landing page without forced dashboard redirect", async ({ page }) => {
  43 |     // 1. Log in via UI
  44 |     // 2. Navigate to "/"
  45 |     // 3. Expect URL to remain "/"
  46 |     // 4. Expect Navbar to show "Dashboard" button instead of "Log in"
  47 |   });
  48 | 
  49 |   test.skip("Account deletion flow shows danger confirmation modal", async ({ page }) => {
  50 |     // 1. Log in
  51 |     // 2. Navigate to /settings/account
  52 |     // 3. Click "Delete Account"
  53 |     // 4. Expect confirmation modal to be visible
  54 |     // 5. Expect "Permanently Delete" button inside modal
  55 |   });
  56 | });
  57 | 
```