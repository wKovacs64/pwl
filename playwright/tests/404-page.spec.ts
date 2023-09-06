import { test, expect } from '../utils';

test.describe('404 Page', () => {
  test('has no detectable a11y violations', async ({ page, axePage }) => {
    await page.goto('/404/');
    await axePage.checkA11y();
  });

  test('contains 404', async ({ page }) => {
    await page.goto('/404/');
    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
  });

  test('contains a way to go back', async ({ page }) => {
    await page.goto('/404/');
    await expect(await page.textContent('main')).toMatch(/back/i);
  });
});
