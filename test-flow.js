/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Login
  await page.goto('http://localhost:3000/login');
  await page.fill('input[type="email"]', 'oluwafemiibk@gmail.com');
  await page.fill('input[type="password"]', 'Olui968femi@');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  
  console.log("Logged in, going to projects/new");
  await page.goto('http://localhost:3000/projects/new');
  
  // Create project flow
  await page.waitForSelector('input[placeholder="e.g. Autonomous field rover"]', { timeout: 10000 });
  await page.fill('input[placeholder="e.g. Autonomous field rover"]', 'Demo Project');
  await page.click('button:has-text("Continue")');
  await page.click('button:has-text("Software")');
  await page.click('button:has-text("Continue")');
  await page.click('button:has-text("Continue")');
  
  console.log("Submitting form");
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`Failed request: ${response.url()} - ${response.status()}`);
    }
  });

  await page.click('button:has-text("Create project")');
  await page.waitForTimeout(4000);
  
  const createText = await page.textContent('button[type="submit"]');
  console.log("Button text after submit: ", createText);
  
  const errorAlert = await page.locator('p[role="alert"]').count();
  if (errorAlert > 0) {
    console.log("Error alert: ", await page.locator('p[role="alert"]').textContent());
  }

  await page.screenshot({ path: 'test-flow.png' });
  await browser.close();
})();
