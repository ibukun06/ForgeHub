import { test, expect } from '@playwright/test';

test('Test login with provided credentials', async ({ page }) => {
  // Navigate to login
  await page.goto('/login');
  
  // Wait for form
  const form = page.locator('form');
  await expect(form).toBeVisible();

  // Fill in credentials
  await page.fill('input[type="email"]', 'oluwafemiibk@gmail.com');
  await page.fill('input[type="password"]', 'Olui968femi@');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for network idle or 3 seconds
  await page.waitForTimeout(3000);

  // Check if we are still on login page and print error messages
  if (page.url().includes('/login')) {
    const pageText = await page.evaluate(() => document.body.innerText);
    console.log('--- PAGE TEXT START ---');
    console.log(pageText);
    console.log('--- PAGE TEXT END ---');
  }

  // Wait for redirect to dashboard
  await expect(page).toHaveURL(/.*\/dashboard.*/, { timeout: 10000 });
});
