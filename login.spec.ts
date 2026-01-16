// automated login tests using Playwright (TypeScript)

import { test, expect } from '@playwright/test';

test('login page elements', async ({ page }) => {
    await page.goto('https://example.com/login');
    expect(await page.locator('input[name="username"]').isVisible()).toBe(true);
    expect(await page.locator('input[name="password"]').isVisible()).toBe(true);
    expect(await page.locator('button[type="submit"]').isVisible()).toBe(true);
});

test('login with valid credentials redirects to dashboard', async ({ page }) => {
    // Use environment variables when available to avoid hardcoding secrets in the repo
    const username = process.env.TEST_USERNAME ?? 'testuser';
    const password = process.env.TEST_PASSWORD ?? 'password';

    await page.goto('https://example.com/login');

    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    // Click the submit button and wait for the navigation to the dashboard
    await Promise.all([
        page.waitForURL('https://example.com/dashboard', { waitUntil: 'load' }),
        page.click('button[type="submit"]'),
    ]);

    expect(page.url()).toBe('https://example.com/dashboard');
});

test('logout functionality', async ({ page }) => {
    await page.goto('https://example.com/dashboard');
    await page.click('button#logout');
    await page.waitForURL('https://example.com/login');
    expect(page.url()).toBe('https://example.com/login');
});
