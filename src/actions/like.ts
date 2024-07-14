"use server";

import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const LikeAction = async (ideaId: number, userId: string) => {
    const t = await getTranslations()

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    ideaId,
                    userId,
                },
            });
        }

        revalidatePath("/");
    } catch (error) {
        return t("action.error_like");
    }
};

export { LikeAction };
