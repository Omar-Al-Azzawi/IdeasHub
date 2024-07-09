"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const LikeAction = async (ideaId: number, userId: string) => {
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
        console.error("Failed to toggle like", error);
        return "Failed to toggle like. Please try again later.";
    }
};

export { LikeAction };
