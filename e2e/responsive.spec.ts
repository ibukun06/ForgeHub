import { test, expect } from '@playwright/test';

test.describe('Responsive Behavior', () => {
  test('Landing page renders correctly on mobile', async ({ page, isMobile }) => {
    // Only run this test if we are testing a mobile viewport
    if (!isMobile) return;

    await page.goto('/');
    
    // Check if the hamburger menu or bottom nav is visible instead of full header
    // This is an assumption of how the app handles mobile nav
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Verify no horizontal scrolling by checking if body width equals viewport width
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportSize.width);
    }
  });
});
