# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tracks.spec.ts >> Track A & B Verification >> Explore page loads and shows Technical Discovery (Track B)
- Location: e2e\tracks.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/explore", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Track A & B Verification', () => {
  4  |   // We use test.use to preserve authentication state if we had it, but here we just login manually
  5  |   test('Explore page loads and shows Technical Discovery (Track B)', async ({ page }) => {
> 6  |     await page.goto('/explore');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  7  |     await expect(page.locator('text="Technical Discovery"')).toBeVisible();
  8  |     await expect(page.locator('text="Living Technical Graph"')).toBeVisible();
  9  |   });
  10 | 
  11 |   test('User login and settings access (Track A)', async ({ page }) => {
  12 |     // 1. Navigate to login
  13 |     await page.goto('/login');
  14 |     
  15 |     // 2. Fill login form
  16 |     await page.fill('input[type="email"]', 'test_audit@example.com');
  17 |     await page.fill('input[type="password"]', 'Test_Audit!123');
  18 |     
  19 |     // 3. Submit
  20 |     await page.click('button[type="submit"]');
  21 |     
  22 |     // 4. Wait for navigation to inbox/dashboard
  23 |     // If auth works, it redirects to /inbox
  24 |     // For now we just verify we don't crash
  25 |   });
  26 | 
  27 |   test('Project Files route renders FileViewer (Track C)', async ({ page }) => {
  28 |     // Navigate directly to a mock files route
  29 |     await page.goto('/w/some-workspace/p/some-project/files');
  30 |     
  31 |     // Verify the heading and elements
  32 |     await expect(page.locator('text="Project Files"')).toBeVisible();
  33 |     await expect(page.locator('text="Preview: architecture-diagram.png"')).toBeVisible();
  34 |     
  35 |     // Check for the "Upload File" button
  36 |     await expect(page.locator('button:has-text("Upload File")')).toBeVisible();
  37 |   });
  38 | });
  39 | 
```