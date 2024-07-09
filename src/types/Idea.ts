import { Prisma } from "@prisma/client";

export type User = {
    id: string;
    name: string | null;
    email: string;
    imagePath: string | null;
};

export type Comment = {
    content: string;
    createdAt: Date;
    author: {
        name: string | null;
        imagePath: string | null;
    };
};

export type Idea = {
    id: number;
    author: User;
    title: string;
    content: Prisma.JsonValue | null;
    imagePath: string | null;
    createdAt: Date;
    tags: string[];
    comments: Comment[];
    likes: { ideaId: number; userId: string }[];
    bookmarks: { ideaId: number; userId: string }[];
};
