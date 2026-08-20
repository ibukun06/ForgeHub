import { test, expect } from '@playwright/test';

test.describe('Authentication & Onboarding', () => {
  test('unauthenticated user trying to access /dashboard is redirected to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/login.*/);
  });

  test('unauthenticated user trying to access a private workspace is redirected', async ({ page }) => {
    await page.goto('/w/some-workspace/p/some-project');
    await expect(page).toHaveURL(/.*\/login.*/);
  });

  test('Signup page renders and accepts input', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('form')).toBeVisible();
    
    // Fill out form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    
    // We do not submit to avoid polluting the db in a basic run, 
    // but we can check if validation passes
  });

  test('Login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
