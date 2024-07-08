'use client'

import { useRef, useEffect } from 'react';
import { FormState } from '@/types/Form';
import { toast } from 'sonner';

const useToastMessage = (formState: FormState) => {
    const prevTimestamp = useRef(formState.timestamp);

    const showToast =
        formState.message &&
        formState.timestamp !== prevTimestamp.current;

    useEffect(() => {
        if (showToast) {
            if (formState.success) {
                toast(formState.message);
            } else {
                toast(formState.message);
            }

            prevTimestamp.current = formState.timestamp;
        }
    }, [formState, showToast]);
};

export { useToastMessage };
