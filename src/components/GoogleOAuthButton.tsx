'use client'

import React from 'react'
import { Button } from './ui/button'
import { getGoogleOauth } from '@/actions/google-auth'
import { toast } from 'sonner'
import Image from 'next/image'
import GoogleIcon from "@/assets/google-icon.jpg"
import { useTranslations } from 'next-intl'

const GoogleOAuthButton = () => {
    const t = useTranslations()

    return (
        <Button className='w-full' onClick={async () => {
            const res = await getGoogleOauth()

            if (res.url) {
                window.location.href = res.url
            } else {
                toast.error(res.error)
            }
        }}>
            <Image src={GoogleIcon} alt='google-icon' width={20} height={20} />
            <span className='mx-2'>{t('forms.login.google')}</span>
        </Button>
    )
}

export default GoogleOAuthButton
