# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-verification.spec.ts >> ForgeHub UI/UX Redesign Verification >> Login Page functions correctly for testing account
- Location: e2e\ui-verification.spec.ts:28:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]
  - alert [ref=e11]
  - generic [ref=e12]:
    - complementary [ref=e13]:
      - generic [ref=e14]:
        - link [ref=e15] [cursor=pointer]:
          - /url: /inbox
          - img "ForgeHub Logo" [ref=e17]
          - generic [ref=e18]:
            - paragraph [ref=e19]: ForgeHub
            - paragraph [ref=e20]: Project OS
        - button "Close navigation" [ref=e21] [cursor=pointer]
      - button "Search, command, or ask AI" [ref=e26] [cursor=pointer]:
        - generic [ref=e30]: Search, command...
      - navigation "Primary navigation" [ref=e31]:
        - link "Inbox" [ref=e32] [cursor=pointer]:
          - /url: /inbox
        - link "Work" [ref=e37] [cursor=pointer]:
          - /url: /work
        - link "Projects" [ref=e43] [cursor=pointer]:
          - /url: /projects
        - link "Knowledge" [ref=e47] [cursor=pointer]:
          - /url: /knowledge
      - generic [ref=e52]:
        - generic [ref=e53]: Favorites
        - generic [ref=e57]:
          - link "ForgeHub Redesign" [ref=e58] [cursor=pointer]:
            - /url: /w/forgehub/p/forgehub-redesign/overview
          - link "Execution board" [ref=e63] [cursor=pointer]:
            - /url: /work#board
      - generic [ref=e67]:
        - generic [ref=e69]:
          - paragraph [ref=e70]: Signed in
          - paragraph [ref=e71]: Ibukunoluwa Oluwafemi
          - paragraph [ref=e72]: oluwafemiibk@gmail.com
        - generic "Ibukunoluwa Oluwafemi — oluwafemiibk@gmail.com" [ref=e73]: IO
    - generic [ref=e75]:
      - banner [ref=e76]:
        - generic [ref=e77]:
          - button "Open navigation" [ref=e78] [cursor=pointer]
          - generic [ref=e80]:
            - generic [ref=e81]: Inbox
            - generic [ref=e84]:
              - paragraph [ref=e85]: Inbox · global view
              - paragraph [ref=e86]: Inbox
          - button "Current theme is system. Click to switch." [ref=e87] [cursor=pointer]
          - button "OL" [ref=e92] [cursor=pointer]
      - main [ref=e95]
    - navigation "Mobile navigation" [ref=e240]:
      - generic [ref=e241]:
        - link "Inbox" [ref=e242] [cursor=pointer]:
          - /url: /inbox
        - link "Work" [ref=e246] [cursor=pointer]:
          - /url: /work
        - button "Quick Action" [ref=e252] [cursor=pointer]
        - link "Projects" [ref=e254] [cursor=pointer]:
          - /url: /projects
        - link "Knowledge" [ref=e257] [cursor=pointer]:
          - /url: /knowledge
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('ForgeHub UI/UX Redesign Verification', () => {
  4  |   test('Landing Page renders industrial aesthetic and Project Map Hero', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     
  7  |     // Verify "The Operating System for Technical Creation" exists
  8  |     await expect(page.getByText('The Operating System for Technical Creation')).toBeVisible();
  9  |     
  10 |     // Verify Project Map preview exists
  11 |     await expect(page.getByText('Project Map / Active State')).toBeVisible();
  12 |     await expect(page.getByText('PROTOTYPE TESTING')).toBeVisible();
  13 |   });
  14 | 
  15 |   test('Explore Page renders Technical Discovery graph and domains', async ({ page }) => {
  16 |     await page.goto('/explore');
  17 |     
  18 |     // Verify title
  19 |     await expect(page.getByRole('heading', { name: 'Technical Discovery' })).toBeVisible();
  20 |     
  21 |     // Verify domains
  22 |     await expect(page.getByText('Mechanical Systems')).toBeVisible();
  23 |     
  24 |     // Verify graph section
  25 |     await expect(page.getByText('Living Technical Graph')).toBeVisible();
  26 |   });
  27 |   
  28 |   test('Login Page functions correctly for testing account', async ({ page }) => {
  29 |     await page.goto('/login');
  30 |     
  31 |     await page.fill('input[name="email"]', 'oluwafemiibk@gmail.com');
  32 |     await page.fill('input[name="password"]', 'Olui968femi@');
  33 |     
  34 |     // Uncheck remember me to avoid the previous Zod null issue
  35 |     const rememberMe = page.locator('input[name="rememberMe"]');
  36 |     if (await rememberMe.isVisible() && await rememberMe.isChecked()) {
  37 |       await rememberMe.uncheck();
  38 |     }
  39 |     
  40 |     await page.click('button[type="submit"]');
  41 |     
  42 |     // Wait for navigation or error
> 43 |     await page.waitForLoadState('networkidle');
     |                ^ Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
  44 |   });
  45 | });
  46 | 
```