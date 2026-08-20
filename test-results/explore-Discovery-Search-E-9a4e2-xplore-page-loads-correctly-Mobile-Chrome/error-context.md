# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Discovery & Search (Explore) >> Explore page loads correctly
- Location: e2e\explore.spec.ts:4:7

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
  3  | test.describe('Discovery & Search (Explore)', () => {
  4  |   test('Explore page loads correctly', async ({ page }) => {
> 5  |     await page.goto('/explore');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  6  |     
  7  |     // Expect the page to have a grid or search element
  8  |     // Assuming there is a main container or search input
  9  |     const exploreContainer = page.locator('main');
  10 |     await expect(exploreContainer).toBeVisible();
  11 |     
  12 |     // We check if the search input exists
  13 |     const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
  14 |     if (await searchInput.count() > 0) {
  15 |       await expect(searchInput).toBeVisible();
  16 |     }
  17 |   });
  18 | });
  19 | 
```