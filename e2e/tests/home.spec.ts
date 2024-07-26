import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(5000)
  await expect(page).toHaveTitle(/ideahub/i);
});
