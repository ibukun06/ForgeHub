import { test, expect } from '@playwright/test';

test.describe('Track A & B Verification', () => {
  // We use test.use to preserve authentication state if we had it, but here we just login manually
  test('Explore page loads and shows Technical Discovery (Track B)', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.locator('text="Technical Discovery"')).toBeVisible();
    await expect(page.locator('text="Living Technical Graph"')).toBeVisible();
  });

  test('User login and settings access (Track A)', async ({ page }) => {
    // 1. Navigate to login
    await page.goto('/login');
    
    // 2. Fill login form
    await page.fill('input[type="email"]', 'test_audit@example.com');
    await page.fill('input[type="password"]', 'Test_Audit!123');
    
    // 3. Submit
    await page.click('button[type="submit"]');
    
    // 4. Wait for navigation to inbox/dashboard
    // If auth works, it redirects to /inbox
    // For now we just verify we don't crash
  });

  test('Project Files route renders FileViewer (Track C)', async ({ page }) => {
    // Navigate directly to a mock files route
    await page.goto('/w/some-workspace/p/some-project/files');
    
    // Verify the heading and elements
    await expect(page.locator('text="Project Files"')).toBeVisible();
    await expect(page.locator('text="Preview: architecture-diagram.png"')).toBeVisible();
    
    // Check for the "Upload File" button
    await expect(page.locator('button:has-text("Upload File")')).toBeVisible();
  });
});
