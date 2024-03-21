import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'

const navigationTitles = ['Dashboard', 'Wallet', 'Swap It', 'Borrow It', 'Lend It', 'Connect Wallet']

test.describe('navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL)
    })

    test('navigation titles', async ({ page }) => {
        await expect(page.getByRole('listitem')).toHaveText(navigationTitles)
        await expect(page).toHaveURL(BASE_URL)
    })

    test('wallet', async ({ page }) => {
        await page.getByRole('link', {name: 'Wallet'}).click()
        await expect(page).toHaveURL('/wallet')
    })

    test('swap', async ({ page }) => {
        await page.getByRole('link', {name: 'Swap It'}).click()
        await expect(page).toHaveURL('/swap')
    })

    test('borrow', async ({ page }) => {
        await page.getByRole('link', {name: 'Borrow It'}).click()
        await expect(page).toHaveURL('/borrow')
    })

    test('lend', async ({ page }) => {
        await page.getByRole('link', {name: 'Lend It'}).click()
        await expect(page).toHaveURL('/lend')
    })

    test('dashboard', async ({ page }) => {
        await page.getByRole('link', {name: 'Dashboard'}).click()
        await expect(page).toHaveURL(BASE_URL)
    })
})