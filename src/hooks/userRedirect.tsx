'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormState } from '@/types/Form';

const useRedirect = (formState: FormState) => {
    const router = useRouter();

    useEffect(() => {
        if (formState.success && formState.data?.redirect) {
            router.push(formState.data.redirect);
        }
    }, [formState, router]);
};

export { useRedirect };
