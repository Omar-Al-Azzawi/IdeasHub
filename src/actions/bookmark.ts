"use server";

import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const BookmarkAction = async (ideaId: number, userId: string) => {
    const t = await getTranslations()
    try {
        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId,
                },
            },
        });

        if (existingBookmark) {
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmark.id,
                },
            });
        } else {
            await prisma.bookmark.create({
                data: {
                    ideaId,
                    userId,
                },
            });
        }

        revalidatePath("/");
    } catch (error) {
        return t("action.error_bookmark");
    }
}

export { BookmarkAction }
