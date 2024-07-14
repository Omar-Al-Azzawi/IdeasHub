"use server";

import { PrismaClient } from "@prisma/client";
import { uploadImage } from "@/lib/upload-image";
import { type EditIdeaFormData, EditIdeaSchema } from "./schema"
import { revalidatePath } from "next/cache";
import { FormState } from "@/types/Form";
import { getLocale, getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const editIdeaAction = async (
    id: number,
    content: string,
    tags: string[],
    prevState: FormState,
    formData: FormData,
) => {
    const timestamp = Date.now();
    const activeLocale = await getLocale()
    const t = await getTranslations()

    try {
        const title = formData.get("title") as string;
        const image = formData.get("imagePath") as File | null;
        const published = formData.get("published") === 'true';

        let imagePath = null;
        if (image) {
            imagePath = await uploadImage(image);
        }

        let contentParse = null;
        if (content) {
            contentParse = JSON.parse(content);
        }

        const data: Partial<EditIdeaFormData> = {
            title,
            content: contentParse,
            imagePath: imagePath ?? undefined,
            published,
            tags,
        };

        const result = EditIdeaSchema.safeParse(data);
        if (!result.success) {
            return { success: false, message: "Validation failed", timestamp };
        }

        await prisma.idea.update({
            where: { id },
            data: result.data,
        });

        const redirect = `/${activeLocale}/ideas`

        revalidatePath('/')
        return {
            success: true,
            message: t('forms.idea.edit_success_msg'),
            timestamp,
            data: {
                redirect
            }
        };
    } catch (error) {
        console.error("Failed editing idea", error);
        return { success: false, message: t('forms.idea.edit_error_msg'), timestamp };
    }
};

export { editIdeaAction };
