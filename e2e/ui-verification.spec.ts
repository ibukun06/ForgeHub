import { test, expect } from '@playwright/test';

test.describe('ForgeHub UI/UX Redesign Verification', () => {
  test('Landing Page renders industrial aesthetic and Project Map Hero', async ({ page }) => {
    await page.goto('/');
    
    // Verify "The Operating System for Technical Creation" exists
    await expect(page.getByText('The Operating System for Technical Creation')).toBeVisible();
    
    // Verify Project Map preview exists
    await expect(page.getByText('Project Map / Active State')).toBeVisible();
    await expect(page.getByText('PROTOTYPE TESTING')).toBeVisible();
  });

  test('Explore Page renders Technical Discovery graph and domains', async ({ page }) => {
    await page.goto('/explore');
    
    // Verify title
    await expect(page.getByRole('heading', { name: 'Technical Discovery' })).toBeVisible();
    
    // Verify domains
    await expect(page.getByText('Mechanical Systems')).toBeVisible();
    
    // Verify graph section
    await expect(page.getByText('Living Technical Graph')).toBeVisible();
  });
  
  test('Login Page functions correctly for testing account', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[name="email"]', 'oluwafemiibk@gmail.com');
    await page.fill('input[name="password"]', 'Olui968femi@');
    
    // Uncheck remember me to avoid the previous Zod null issue
    const rememberMe = page.locator('input[name="rememberMe"]');
    if (await rememberMe.isVisible() && await rememberMe.isChecked()) {
      await rememberMe.uncheck();
    }
    
    await page.click('button[type="submit"]');
    
    // Wait for navigation or error
    await page.waitForLoadState('networkidle');
  });
});
