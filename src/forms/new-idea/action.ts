"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "@/types/Form";
import { PrismaClient } from "@prisma/client";
import { uploadImage } from "@/lib/upload-image";
import { NewIdeaSchema } from "./schema"
import { getUser } from "@/lib/lucia";

const prisma = new PrismaClient();

const newIdeaAction = async (
    activeLocale: string,
    content: any,
    tags: string[],
    prevState: FormState,
    formData: FormData,
) => {
    const timestamp = Date.now();

    try {
        const user = await getUser()
        if (!user) {
            return { success: false, message: "You must be logged in to edit your profile." };
        }

        const title = formData.get("title") as string;
        const image = formData.get("imagePath") as File | null;
        const published = formData.get("published") === "on";

        let imagePath = null;
        if (image) {
            imagePath = await uploadImage(image);
        }

        let contentParse = null;
        if (content) {
            contentParse = JSON.parse(content);
        }

        const data = {
            title,
            content: contentParse,
            imagePath: imagePath ?? null,
            published,
            authorId: user?.id,
            tags,
        };

        const result = NewIdeaSchema.safeParse(data);

        if (!result.success) {
            return { success: false, message: "Validation failed", timestamp };
        }

        await prisma.idea.create({
            data: result.data,
        });

        const redirect = `/${activeLocale}/ideas`

        revalidatePath("/");
        return {
            success: true,
            message: "Idea created successfully",
            timestamp,
            data: {
                redirect
            }
        };

    } catch (error) {
        console.error("Failed creating idea", error);
        return { success: false, message: "Failed creating idea", timestamp };
    }
};

export { newIdeaAction };
