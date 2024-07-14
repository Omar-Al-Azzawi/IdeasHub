"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormState } from "react-dom";
import { newIdeaAction } from "./action";
import SubmitButton from "@/components/SubmitButton";
import RTE from "@/components/RTE/rich-text-editor";
import TagInput from "@/components/TagSelect";
import { JSONContent } from "@tiptap/react";
import { useToastMessage } from "@/hooks/useToastMsg";
import { useRedirect } from "@/hooks/useRedirect";
import { useLocale, useTranslations } from "next-intl";

const initialState = {
    success: true,
    message: '',
}

const NewIdeaForm = () => {
    const activeLocale = useLocale()
    const t = useTranslations()
    const form = useForm();
    const [content, setContent] = useState<null | JSONContent>(null);
    const [tags, setTags] = useState<string[]>([]);
    const newIdea = newIdeaAction.bind(null, activeLocale, JSON.stringify(content), tags);
    const [state, formAction] = useFormState(newIdea, initialState);

    useToastMessage(state);
    useRedirect(state);

    const handleChange = (data: JSONContent) => {
        setContent(data);
    };

    return (
        <div className="flex min-h-full flex-col justify-center mt-16 sm:px-6 lg:px-18">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
                    {t('forms.new_idea.form_title')}
                </h2>
            </div>
            <Form {...form}>
                <form action={formAction} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.new_idea.title')}</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <RTE onChange={handleChange} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imagePath"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.new_idea.image')}</FormLabel>
                                <Input {...field} type="file" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.new_idea.tags')}</FormLabel>
                                <TagInput tags={tags} setTags={setTags} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Checkbox {...field} />
                                </FormControl>
                                <FormLabel className="text-Black mx-2">{t('forms.new_idea.publish')}</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <SubmitButton pendingText="Save..." text="Save" />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewIdeaForm;
