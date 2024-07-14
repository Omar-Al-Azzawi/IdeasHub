"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormState } from "react-dom";
import { editIdeaAction } from "./action";
import SubmitButton from "@/components/SubmitButton";
import RTE from "@/components/RTE/rich-text-editor";
import TagInput from "@/components/TagSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EditIdeaFormData, EditIdeaSchema } from "./schema"
import { useToastMessage } from "@/hooks/useToastMsg";
import { useRedirect } from "@/hooks/useRedirect";
import { useTranslations } from "next-intl";

type Props = {
    idea: any
};

const initialState = {
    success: true,
    message: '',
}

const EditIdeaForm = ({ idea }: Props) => {
    const t = useTranslations()
    const form = useForm<EditIdeaFormData>({
        resolver: zodResolver(EditIdeaSchema),
        defaultValues: {
            title: idea.title,
            content: idea.content,
            tags: idea.tags,
            published: idea.published
        },
    })
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>(idea.tags);
    const editIdea = editIdeaAction.bind(null, idea.id, JSON.stringify(content), tags);
    const [state, formAction] = useFormState(editIdea, initialState);

    useToastMessage(state)
    useRedirect(state)

    const handleChange = (data: string) => {
        setContent(data);
    };

    return (
        <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-18">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
                    {t('forms.idea.edit_title')}
                </h2>
            </div>
            <Form {...form}>
                <form action={formAction} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.idea.title')}</FormLabel>
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
                                <RTE onChange={handleChange} content={idea.content} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imagePath"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('forms.idea.image')}</FormLabel>
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
                                <FormLabel>{t('forms.idea.tags')}</FormLabel>
                                <TagInput tags={tags} setTags={setTags} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <Checkbox {...field} value={idea.published} defaultChecked={idea.published} />
                                <FormLabel className="align-middle">{t('forms.idea.publish')}</FormLabel>
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

export default EditIdeaForm;
