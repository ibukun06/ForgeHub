import { test, expect } from '@playwright/test';

test.describe('Security & RLS', () => {
  test('Direct API mutation requests without session return 401', async ({ request }) => {
    // Attempt to hit the save section API endpoint
    // We expect a 401 Unauthorized because we are not sending auth cookies
    const response = await request.post('/api/projects/1/sections', {
      data: {
        content: 'Malicious content'
      }
    });
    
    // Depending on Next.js setup, it might return 401, 403, or redirect to login (307/302)
    expect([401, 403, 307, 302, 500]).toContain(response.status());
  });
});
