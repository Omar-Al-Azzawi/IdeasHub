'use client'

import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/SubmitButton";
import { editProfileAction } from './action'
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastMessage } from '@/hooks/useToastMsg';
import { type EditProfileFormData, EditProfileSchema } from "./schema";
import { useRedirect } from "@/hooks/useRedirect";
import { useLocale, useTranslations } from "next-intl";

type Props = {
    user: any
}

const initialState = {
    success: true,
    message: '',
}

const EditProfileForm = ({ user }: Props) => {
    const t = useTranslations()
    const activeLocal = useLocale()
    const form = useForm<EditProfileFormData>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name: user.name,
            bio: user.bio || '',
            imagePath: ""
        },
    })

    const [state, formAction] = useFormState(editProfileAction, initialState);

    useToastMessage(state);
    useRedirect(state);

    return (
        <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-18 h-[70vh]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight">
                    {t('forms.edit_profile.title')}
                </h2>
            </div>
            <Form {...form}>
                <form action={formAction} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.edit_profile.name')}</FormLabel>
                                <Input placeholder="John doe" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.edit_profile.bio')}</FormLabel>
                                <Textarea placeholder="Write your bio here" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imagePath"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.edit_profile.image')}</FormLabel>
                                <Input {...field} type="file" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton pendingText={t('action.saving')} text={t('action.save')} />
                    <Button asChild variant='ghost'>
                        <Link className="hover:text-teal-500" href={`/${activeLocal}/profile`}>{t('action.cancel')}</Link>
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default EditProfileForm
