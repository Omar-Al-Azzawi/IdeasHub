"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type CommentFormData, CommentSchema } from "./schema"
import { getUser } from "@/lib/lucia";

const prisma = new PrismaClient();

const newCommentAction = async (
    ideaId: string,
    commentFormData: CommentFormData,
) => {
    try {
        const user = await getUser()
        if (!user) {
            return { success: false, message: "You must be logged in to comment." };
        }

        const data = {
            content: commentFormData.content,
            ideaId: Number(ideaId),
            authorId: user.id,
        };

        const result = CommentSchema.safeParse(data);
        if (!result.success) {
            return { success: false, message: "Invalid input data!" };
        }

        await prisma.comment.create({
            data: {
                content: result.data.content,
                ideaId: Number(ideaId),
                authorId: user.id,
            },
        });

        revalidatePath("/");
        return { success: true, message: "Comment added successfully" };
    } catch (error) {
        console.error("Failed adding comment", error);
        return { success: false, message: "Failed adding comment. Please try again!" };
    }
};

export { newCommentAction };
