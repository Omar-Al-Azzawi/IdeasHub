"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const followAction = async (followerId: string, followingId: string) => {
    const timestamp = Date.now();
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
            return { success: true, message: "Unfollowed successfully.", timestamp };
        } else {
            await prisma.follower.create({
                data: {
                    follower: { connect: { id: followerId } },
                    following: { connect: { id: followingId } },
                },
            });

            revalidatePath('/');
            return { success: true, message: "Followed successfully.", timestamp };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to toggle follow status.", timestamp };
    }
};

export { followAction };
