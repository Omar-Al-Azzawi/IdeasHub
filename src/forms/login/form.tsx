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
import { loginAction } from "./action";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, LoginSchema } from "./schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";

const LoginForm = () => {
    const localActive = useLocale();
    const t = useTranslations()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();

    async function onSubmit(values: LoginFormData) {
        const result = await loginAction(values);
        if (result.success) {
            form.reset();
            toast(result.message);
            router.push("/");
        } else {
            toast.error(result.message);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-18 h-[70vh]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight">
                    {t('forms.login.title')}
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.login.email')}</FormLabel>
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
                                <FormLabel>{t('forms.login.password')}</FormLabel>
                                <Input placeholder="abcd1234%" type="password" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <SubmitButton
                            pendingText={t('action.logging')}
                            text={t('action.login')}
                        />
                        <span className="pt-2">
                            {t('forms.login.do_not_have_account')}{" "}
                            <Link className="text-teal-500" href={`/${localActive}/signup`}>
                                {t('action.signup')}
                            </Link>
                        </span>
                    </div>
                    <GoogleOAuthButton />
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
