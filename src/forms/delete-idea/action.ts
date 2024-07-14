"use server";

import prisma from "@/lib/db";
import { getUser } from "@/lib/lucia";
import { getTranslations } from "next-intl/server";
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
    const t = await getTranslations()
    const user = await getUser()

    try {
        if (!user) {
            return { success: false, message: t("action.error_auth_user"), timestamp };
        }

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
                    authorId: user?.id
                }
            });
        });

        revalidatePath("/");
        return { success: true, message: t("action.success_delete_idea"), timestamp };
    } catch (e) {
        return { success: false, message: t("action.error_delete_idea"), timestamp };
    }
}
