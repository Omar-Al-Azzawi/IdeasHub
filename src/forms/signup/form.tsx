"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { signupAction } from "./action";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type SignupFormData, SignupSchema } from "./schema";
import { useLocale, useTranslations } from "next-intl";

const SignupForm = () => {
    const router = useRouter();
    const localActive = useLocale();
    const t = useTranslations()

    const form = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignupFormData) {
        const result = await signupAction(values);
        if (result.success) {
            form.reset();
            toast(result.message);
            router.push(`/${localActive}/login`);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-18 h-[70vh]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight">
                    {t('forms.signup.title')}
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    {t('forms.signup.name')}
                                </FormLabel>
                                <Input placeholder="John Doe" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    {t('forms.signup.email')}
                                </FormLabel>
                                <Input placeholder="example@email.com" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    {t('forms.signup.password')}
                                </FormLabel>
                                <Input placeholder="abcd1234%" type="password" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <SubmitButton pendingText={t('action.saving')} text={t('action.signup')} />
                        <span className="pt-2">
                            {t('forms.signup.you_have_account')}{" "}
                            <Link className="text-teal-500" href={`/${localActive}/login`}>
                                {t('action.login')}
                            </Link>
                        </span>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;
