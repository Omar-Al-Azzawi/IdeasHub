"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type CommentFormData, CommentSchema } from "./schema"
import { getUser } from "@/lib/lucia";
import { getTranslations } from "next-intl/server";
import { NotificationTypes } from "@/Constant/Index";
import { Idea } from "@/types/Idea";

const prisma = new PrismaClient();

const newCommentAction = async (
    idea: Idea,
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
            ideaId: Number(idea.id),
            authorId: user.id,
        };

        const result = CommentSchema.safeParse(data);
        if (!result.success) {
            return { success: false, message: t("action.error_validation") };
        }

        await prisma.comment.create({
            data: {
                content: result.data.content,
                ideaId: Number(idea.id),
                authorId: String(user.id),
            },
        });

        await prisma.notification.create({
            data: {
                type: NotificationTypes.COMMENT,
                content: `${user?.name} ${t('notifications.commenting')} ${idea.title}`,
                issuer: { connect: { id: String(user?.id) } },
                recipient: { connect: { id: idea.author.id } },
                idea: { connect: { id: idea.id } }
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
