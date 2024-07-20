import prisma from "@/lib/db";

async function getNotifications(userId: string) {
    const notifications = await prisma.notification.findMany({
        where: {
            readAt: null,
            userId
        }
    });

    return notifications;
}

export default getNotifications;
