const { test, describe, expect } = require('@playwright/test');

describe('login page', () => {
  test('elements of login page all visible', async ({ page }) => {
    await page.goto('');
    await expect(page.getByText('Blogs List')).toBeVisible();
    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
  });
});
