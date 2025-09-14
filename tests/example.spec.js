// @ts-check
import { test, expect } from '@playwright/test';

test('1 has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Swag Labs");
});


test('2 get started link', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
await expect(page).toHaveTitle("Instagram");
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('3 get started everyone playwright is awesome', async ({ page }) => {
  await page.goto('http://google.com');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('welcome to playwright , full of oppurtunity', async ({ page }) => {
  await page.goto('https://www.instagram.com/');
 await expect(page).toHaveTitle("Instagram1");
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});