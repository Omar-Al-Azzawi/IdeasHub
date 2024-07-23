"use server";

import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const notificationAction = async (notificationId: number) => {
    const timestamp = Date.now();
    const t = await getTranslations();

    try {
        await prisma.notification.update({
            where: { id: notificationId },
            data: { readAt: new Date() }
        });

        revalidatePath('/');
        return { success: true, message: t("notifications.success_read"), timestamp };
    } catch (error) {
        return { success: false, message: t("notifications.error_read"), timestamp };
    }
};

const markAllNotificationsRead = async (userId: string) => {
    const timestamp = Date.now();
    const t = await getTranslations();

    try {
        await prisma.notification.updateMany({
            where: { recipientId: userId, readAt: null },
            data: { readAt: new Date() }
        });

        revalidatePath('/');
        return { success: true, message: t("notifications.success_read_all"), timestamp };
    } catch (error) {
        return { success: false, message: t("notifications.error_read_all"), timestamp };
    }
};

export { notificationAction, markAllNotificationsRead };
