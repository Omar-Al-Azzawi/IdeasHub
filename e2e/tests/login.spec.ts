import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv'
import { login } from '../helper/login'

dotenv.config({
    path: '../../.env',
})

const credentials = {
    email: process.env.E2E_EMAIL || '',
    password: process.env.E2E_PASSWORD || '',
}

test.describe.only('login page', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/login')
    })

    test.use({ storageState: { cookies: [], origins: [] } })
    test('login with invalid credentials', async ({ page }) => {
        await login('test', 'test', page)
        await expect(page.getByText(/Validation failed/i)).toBeVisible()
    })

    test('empty password and get error message', async ({ page }) => {
        await login(credentials.email, '', page)
        await expect(page.getByText(/Validation failed/i)).toBeVisible()
    })

    test('empty email and get error message', async ({ page }) => {
        await login('', credentials.password, page)
        await expect(page.getByText(/Validation failed/i)).toBeVisible()
    })

    test('login with valid credentials', async ({ page }) => {
        await login(credentials.email, credentials.password, page)
        await page.getByText(/Share Your Ideas, Inspire the World/i).textContent()
        await expect(page.getByText(/Share Your Ideas, Inspire the World/i)).toBeVisible()
    })
})
