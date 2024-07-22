"use server";

import { NotificationTypes } from "@/Constant/Index";
import { getUser } from "@/lib/lucia";
import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const LikeAction = async (ideaId: number, userId: string) => {
    const t = await getTranslations();
    const user = await getUser();

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId,
                },
            },
        });

        const idea = await prisma.idea.findUnique({
            where: { id: ideaId },
            include: { author: true },
        });

        if (!idea) {
            throw new Error("Idea not found");
        }

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

            if (String(user?.id) !== idea.authorId) {
                await prisma.notification.create({
                    data: {
                        type: NotificationTypes.LIKE,
                        content: `${user?.name} ${t('notifications.like_idea')} ${idea.title}`,
                        user: { connect: { id: idea.authorId } },
                    },
                });
            }
        }

        revalidatePath("/");
    } catch (error) {
        console.error(error);
        return t("action.error_like");
    }
};

export { LikeAction };
