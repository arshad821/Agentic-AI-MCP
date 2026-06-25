const { test, expect } = require('@playwright/test');

test('sign in, add iPhone X to cart, and confirm checkout', async ({ page }) => {
  test.setTimeout(180000);

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/LoginPage/);

  await page.locator('input[name="username"]').fill('rahulshettyacademy');
  await page.locator('input[name="password"]').fill('Learning@830$3mK2');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForURL(/angularpractice\/shop/);
  await expect(page).toHaveTitle(/ProtoCommerce/);

  const iphoneCard = page.locator('.card').filter({ hasText: 'iphone X' }).first();
  await expect(iphoneCard).toBeVisible();
  await iphoneCard.getByRole('button', { name: /add/i }).click();

  const checkoutLink = page.locator('a.nav-link.btn.btn-primary').filter({ hasText: /checkout/i }).first();
  await expect(checkoutLink).toBeVisible();
  await expect(checkoutLink).toContainText('Checkout');

  await checkoutLink.click();
  await expect(page.getByText('iphone X')).toBeVisible();
});
