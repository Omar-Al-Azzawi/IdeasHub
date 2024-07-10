import prisma from "@/lib/db";
import { Idea } from "@/types/Idea";

async function getUserIdeas(userId: string, searchQuery = "", skip = 0, take = 9): Promise<{ ideas: Idea[], total: number }> {
    const ideas = await prisma.idea.findMany({
        where: { authorId: userId },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    imagePath: true,
                },
            },
            comments: {
                select: {
                    content: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true,
                            imagePath: true
                        },
                    },
                },
            },
            likes: {
                select: {
                    ideaId: true,
                    userId: true
                },
            },
            bookmarks: {
                select: {
                    ideaId: true,
                    userId: true
                }
            }
        },
        skip,
        take
    });
    const total = await prisma.idea.count({
        where: {
            published: true,
            OR: [
                {
                    title: {
                        contains: searchQuery,
                        mode: "insensitive",
                    },
                },
                {
                    author: {
                        name: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        }
    });
    return { ideas, total };
}

export default getUserIdeas;
