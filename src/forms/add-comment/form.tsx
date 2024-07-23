"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { newCommentAction } from "./action";
import SubmitButton from "@/components/SubmitButton";
import { type CommentFormData, CommentSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Idea } from "@/types/Idea";

type Props = {
    idea: Idea;
};

const NewCommentForm = ({ idea }: Props) => {
    const t = useTranslations()
    const form = useForm<CommentFormData>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            content: "",
        },
    });

    async function onSubmit(values: CommentFormData) {
        try {
            const result = await newCommentAction(idea, values);
            if (result.success) {
                toast(result.message);
                form.reset();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again!");
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center my-10 px-6 lg:px-32">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 relative">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="message" className="sr-only">
                                    Comment
                                </Label>
                                <Textarea
                                    className="min-h-12 resize-none p-3 shadow-none focus-visible:ring-0 pb-10"
                                    placeholder={t('forms.add_comment.comment_placeholder')}
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between absolute right-2 bottom-2">
                        <SubmitButton
                            pendingText={t('action.adding')}
                            text={t('action.add')}
                            size="sm"
                            icon={<CornerDownLeft className="size-3.5" />}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewCommentForm;
