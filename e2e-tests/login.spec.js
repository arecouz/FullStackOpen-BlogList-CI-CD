import { test } from '@playwright/test';

test('user can login, and click add new blog', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill('user');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('pass');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('heading', { name: 'user' }).click();
  await page.getByRole('button', { name: 'Add blog' }).click();
});
