"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type CommentFormData, CommentSchema } from "./schema"
import { getUser } from "@/lib/lucia";
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const newCommentAction = async (
    ideaId: string,
    commentFormData: CommentFormData,
) => {
    const t = await getTranslations()
    try {
        const user = await getUser()
        if (!user) {
            return { success: false, message: t("forms.add_comment.error_auth") };
        }

        const data = {
            content: commentFormData.content,
            ideaId: Number(ideaId),
            authorId: user.id,
        };

        const result = CommentSchema.safeParse(data);
        if (!result.success) {
            return { success: false, message: t("action.error_validation") };
        }

        await prisma.comment.create({
            data: {
                content: result.data.content,
                ideaId: Number(ideaId),
                authorId: user.id,
            },
        });

        revalidatePath("/");
        return { success: true, message: t("forms.add_comment.success_comment") };
    } catch (error) {
        console.error("Failed adding comment", error);
        return { success: false, message: t("forms.add_comment.error_comment") };
    }
};

export { newCommentAction };
