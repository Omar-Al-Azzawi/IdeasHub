'use server'

import { generateCodeVerifier, generateState } from "arctic"
import { googleOAuthClient } from "@/lib/googleOauth"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"

export const getGoogleOauth = async () => {
    const t = await getTranslations()
    try {
        const state = generateState()
        const codeVerifier = generateCodeVerifier()

        cookies().set('codeVerifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
        cookies().set('state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
            scopes: ['email', 'profile']
        })
        return { success: true, url: authUrl.toString() }

    } catch (error) {
        return { success: false, error: t('action.error') }
    }
}
