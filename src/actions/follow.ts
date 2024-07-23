"use server";

import { NotificationTypes } from "@/Constant/Index";
import { getUser } from "@/lib/lucia";
import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const followAction = async (followerId: string, followingId: string) => {
    const timestamp = Date.now();
    const t = await getTranslations();
    const user = await getUser();

    try {
        if (!followerId || !followingId) {
            throw new Error("Follower ID and Following ID are required.");
        }

        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId,
                followingId,
            },
        });

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id,
                },
            });

            revalidatePath('/');
            return { success: true, message: t("action.success_unfollow"), timestamp };
        } else {
            await prisma.follower.create({
                data: {
                    follower: { connect: { id: followerId } },
                    following: { connect: { id: followingId } },
                },
            });

            await prisma.notification.create({
                data: {
                    type: NotificationTypes.FOLLOW,
                    content: `${user?.name} ${t('notifications.following')}`,
                    issuer: { connect: { id: String(user?.id) } },
                    recipient: { connect: { id: followingId } },
                },
            });

            revalidatePath('/');
            return { success: true, message: t("action.success_follow"), timestamp };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: t("error_follow"), timestamp };
    }
};

export { followAction };
