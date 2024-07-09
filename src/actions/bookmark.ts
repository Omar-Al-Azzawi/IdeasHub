"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const BookmarkAction = async (ideaId: number, userId: string) => {
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
        console.error('Error toggling bookmark:', error);
        return "Failed to bookmark";
    }
}

export { BookmarkAction }
