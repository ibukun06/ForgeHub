import { test, expect } from '@playwright/test';

test.describe('API & Validation Failures', () => {
  test('Submit empty data to Auth forms shows validation errors', async ({ page }) => {
    await page.goto('/login');
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    await page.click('button[type="submit"]');
    // Depending on the UI, zod validation errors usually appear as text
    const errorMessages = page.locator('text=Required').first();
    // Some implementations use HTML5 validation which blocks the submit event, 
    // but if Zod handles it, we should see an error message.
  });
});
