import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ideahub/i);
});
