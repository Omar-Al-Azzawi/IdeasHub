import * as path from 'node:path'
import { type FullConfig, chromium } from '@playwright/test'
import type { Page } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config({
    path: path.resolve(__dirname, './../.env'),
})

const credentials = {
    email: process.env.E2E_EMAIL || '',
    password: process.env.E2E_PASSWORD || '',
}

async function globalSetup(config: FullConfig) {
    const baseURL = config.projects[0]?.use.baseURL
    const browser = await chromium.launch()
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            'x-vercel-protection-bypass': process.env.E2E_BYPASS_SECRET || '',
            'x-vercel-set-bypass-cookie': '1',
        },
    })

    const page: Page = await context.newPage()

    try {
        await context.tracing.start({ screenshots: true, snapshots: true })
        await page.goto(`${baseURL}/en/login`)
        await page.getByPlaceholder('example@email.com').fill(credentials.email)
        await page.getByPlaceholder('abcd1234%').fill(credentials.password)
        await page.getByRole('button', { name: 'Log in' }).click();

        await page.waitForLoadState('networkidle')

        await context.tracing.stop({
            path: './test-results/setup-trace.zip',
        })
    } catch (err) {
        await context.tracing.stop({
            path: './test-results/failed-setup-trace.zip',
        })

        await browser.close()

        throw err
    }

    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'storageState.json' as string })
    await browser.close()
}

export default globalSetup
