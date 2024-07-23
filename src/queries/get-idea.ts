import prisma from "@/lib/db";

async function getIdea(postId: number) {
    const post = await prisma.idea.findUnique({
        where: { id: postId },
        include: {
            author: true,
            comments: {
                include: {
                    author: true
                }
            },
            likes: true,
            bookmarks: true,
        },
    });

    return post;
}

export default getIdea;
