import type { Page } from '@playwright/test'

export const login = async (email: string, password: string, page: Page) => {
    await page.getByPlaceholder('example@email.com').fill(email)
    await page.getByPlaceholder('abcd1234%').fill(password)
    await page.getByRole('button', { name: 'Log in' }).click();
}
