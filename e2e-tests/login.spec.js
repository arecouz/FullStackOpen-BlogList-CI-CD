import { test, expect } from '@playwright/test';

test('user can login, and create a new blog', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill('user');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('pass');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('heading', { name: 'user' }).click();
  await page.getByRole('button', { name: 'Add blog' }).click();
  await page.getByPlaceholder('title').click();
  await page.getByPlaceholder('title').fill('new');
  await page.getByPlaceholder('author').click();
  await page.getByPlaceholder('author').fill('new');
  await page.getByPlaceholder('url').click();
  await page.getByPlaceholder('url').fill('new');
  await page.getByRole('button', { name: 'post' }).click();
  await expect(
    page.getByRole('heading', { name: 'new view' }).getByRole('button')
  ).toBeVisible();
});
