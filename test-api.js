const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/login');
  await page.fill('input[type="email"]', 'oluwafemiibk@gmail.com');
  await page.fill('input[type="password"]', 'Olui968femi@');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  
  const response = await page.request.post('http://localhost:3000/api/projects', {
    data: {
      name: "API Test Project",
      description: "Test description",
      projectType: "software",
      documents: ["problem_statement", "requirements"]
    }
  });
  
  console.log("API Status: ", response.status());
  const body = await response.json().catch(() => null);
  console.log("API Response: ", body);
  
  await browser.close();
})();
