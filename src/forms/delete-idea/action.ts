"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteIdeaAction(
    ideaId: number,
    prevState: {
        success: boolean;
        message: string;
    },
    formData: FormData
) {
    const timestamp = Date.now();

    try {
        const session = false
        if (!session) {
            return { success: false, message: "User not authenticated", timestamp };
        }

        // TODO: get the user ID
        const userId = '1'

        await prisma.$transaction(async (prisma) => {
            await prisma.like.deleteMany({
                where: {
                    ideaId: ideaId
                }
            });

            await prisma.comment.deleteMany({
                where: {
                    ideaId: ideaId
                }
            });

            await prisma.idea.delete({
                where: {
                    id: ideaId,
                    authorId: userId
                }
            });
        });

        revalidatePath("/");
        return { success: true, message: "Deleted idea successfully", timestamp };
    } catch (e) {
        return { success: false, message: "Failed to delete idea", timestamp };
    }
}
