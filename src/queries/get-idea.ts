import prisma from "@/lib/db";

async function getIdea(postId: number) {
    const post = await prisma.idea.findUnique({
        where: { id: postId },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
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
                },
            },
        },
    });

    return post;
}

export default getIdea;
