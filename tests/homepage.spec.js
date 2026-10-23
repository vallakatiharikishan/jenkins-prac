
import { test, expect } from '@playwright/test';

test('TaskTrack application loads successfully', async ({ page }) => {
  const baseURL =
    process.env.BASE_URL ||
    'https://boisterous-bombolone-1d9827.netlify.app';

  await page.goto(baseURL);

  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('body')).not.toBeEmpty();
});
