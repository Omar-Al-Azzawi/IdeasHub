import prisma from "@/lib/db";
import { User } from "@/types/User";

async function getUser(userId: string): Promise<User | null> {
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

    return user as User | null;
}

export default getUser;
