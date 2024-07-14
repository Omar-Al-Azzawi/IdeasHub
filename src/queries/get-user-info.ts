import prisma from "@/lib/db";

async function getUserInfo(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            ideas: true,
            comments: true,
            likes: true,
            followers: true,
            following: true,
        },
    });

    const followersCount = user?.followers.length ?? 0;
    const followingCount = user?.following.length ?? 0;

    return { ...user, followersCount, followingCount };
}

export default getUserInfo;
