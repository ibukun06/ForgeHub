import { test, expect } from '@playwright/test';

test.describe('Discovery & Search (Explore)', () => {
  test('Explore page loads correctly', async ({ page }) => {
    await page.goto('/explore');
    
    // Expect the page to have a grid or search element
    // Assuming there is a main container or search input
    const exploreContainer = page.locator('main');
    await expect(exploreContainer).toBeVisible();
    
    // We check if the search input exists
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible();
    }
  });
});
