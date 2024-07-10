import prisma from "@/lib/db";
import { Idea } from "@/types/Idea";

async function getBookmarks(userId: string, searchQuery = "", skip = 0, take = 9): Promise<{ ideas: Idea[], total: number }> {
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: userId,
            idea: {
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
            },
        },
        include: {
            idea: {
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
                }
            }
        },
        skip,
        take
    });

    const ideas = bookmarks.map(bookmark => bookmark.idea);

    const total = await prisma.bookmark.count({
        where: {
            userId: userId,
            idea: {
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
            },
        }
    });

    return { ideas, total };
}

export default getBookmarks;
