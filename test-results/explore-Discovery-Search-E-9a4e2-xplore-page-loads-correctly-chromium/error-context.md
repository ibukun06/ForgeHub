# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Discovery & Search (Explore) >> Explore page loads correctly
- Location: e2e\explore.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main')
Expected: visible
Error: strict mode violation: locator('main') resolved to 2 elements:
    1) <main>…</main> aka getByRole('main').filter({ hasText: 'ForgeHubTechnical' })
    2) <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">…</main> aka getByRole('main').filter({ hasText: 'ForgeHubTechnical' }).getByRole('main')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "ForgeHub" [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=e5]:
        - link "Explore" [ref=e6] [cursor=pointer]:
          - /url: /explore
        - link "Categories" [ref=e7] [cursor=pointer]:
          - /url: /explore#categories
        - link "How it works" [ref=e8] [cursor=pointer]:
          - /url: /#how-it-works
      - generic [ref=e9]:
        - button "Current theme is system. Click to switch." [ref=e10] [cursor=pointer]
        - link "Log in" [ref=e13] [cursor=pointer]:
          - /url: /login
        - link "Start Forging" [ref=e14] [cursor=pointer]:
          - /url: /signup
  - main [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e18]:
        - generic [ref=e19]: ForgeHub
        - heading "Technical Discovery" [level=1] [ref=e31]
        - paragraph [ref=e32]: Don't just see what people are posting. See what they are building. Explore technical projects, understand the problems being solved, and discover the materials and technologies shaping them.
        - textbox "Search projects, materials, domains, or problems..." [ref=e37]
      - main [ref=e38]:
        - generic [ref=e39]:
          - heading "Recently Published Projects" [level=2] [ref=e40]
          - generic [ref=e43]:
            - heading "No Projects Found" [level=3] [ref=e46]
            - paragraph [ref=e47]: There are no published projects on ForgeHub yet.
        - generic [ref=e48]:
          - generic [ref=e49]:
            - heading "Domains" [level=2] [ref=e50]
            - generic [ref=e54]:
              - generic [ref=e55] [cursor=pointer]:
                - generic [ref=e56]: Mechanical Systems
                - generic [ref=e57]: Explore
              - generic [ref=e58] [cursor=pointer]:
                - generic [ref=e59]: Robotics
                - generic [ref=e60]: Explore
              - generic [ref=e61] [cursor=pointer]:
                - generic [ref=e62]: Renewable Energy
                - generic [ref=e63]: Explore
              - generic [ref=e64] [cursor=pointer]:
                - generic [ref=e65]: AI & ML
                - generic [ref=e66]: Explore
              - generic [ref=e67] [cursor=pointer]:
                - generic [ref=e68]: Embedded Systems
                - generic [ref=e69]: Explore
          - generic [ref=e70]:
            - heading "Living Technical Graph" [level=2] [ref=e71]
            - generic [ref=e77]:
              - generic [ref=e78]: PROJECT
              - generic [ref=e80]: MATERIAL
              - generic [ref=e82]: PROBLEM
            - generic [ref=e84]: Projects connect through shared materials, problems, and solutions.
  - contentinfo [ref=e85]:
    - generic [ref=e86]:
      - generic [ref=e87]:
        - link "ForgeHub" [ref=e88] [cursor=pointer]:
          - /url: /
        - paragraph [ref=e89]: The workspace where engineering builds get documented, not lost.
      - generic [ref=e90]:
        - generic [ref=e91]:
          - heading "Product" [level=3] [ref=e92]
          - list [ref=e93]:
            - listitem [ref=e94]:
              - link "Explore" [ref=e95] [cursor=pointer]:
                - /url: /explore
            - listitem [ref=e96]:
              - link "Browse Categories" [ref=e97] [cursor=pointer]:
                - /url: "#categories"
            - listitem [ref=e98]:
              - link "How it works" [ref=e99] [cursor=pointer]:
                - /url: "#how-it-works"
        - generic [ref=e100]:
          - heading "Account" [level=3] [ref=e101]
          - list [ref=e102]:
            - listitem [ref=e103]:
              - link "Log in" [ref=e104] [cursor=pointer]:
                - /url: /login
            - listitem [ref=e105]:
              - link "Sign up" [ref=e106] [cursor=pointer]:
                - /url: /signup
    - paragraph [ref=e107]: © 2026 ForgeHub.
  - button "Open Next.js Dev Tools" [ref=e113] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Discovery & Search (Explore)', () => {
  4  |   test('Explore page loads correctly', async ({ page }) => {
  5  |     await page.goto('/explore');
  6  |     
  7  |     // Expect the page to have a grid or search element
  8  |     // Assuming there is a main container or search input
  9  |     const exploreContainer = page.locator('main');
> 10 |     await expect(exploreContainer).toBeVisible();
     |                                    ^ Error: expect(locator).toBeVisible() failed
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