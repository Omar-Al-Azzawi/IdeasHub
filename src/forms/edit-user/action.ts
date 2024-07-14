'use server'

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { uploadImage } from "@/lib/upload-image";
import { type EditProfileFormData, EditProfileSchema } from "./schema";
import { getUser } from "@/lib/lucia";
import { getLocale, getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const editProfileAction = async (
    prevState: {
        success: boolean;
        message: string;
    },
    formData: FormData
): Promise<{ success: boolean; message: string; timestamp: number; data?: { redirect: string } }> => {
    const activeLocale = await getLocale();
    const t = await getTranslations();
    const timestamp = Date.now();

    try {
        const user = await getUser();
        if (!user) {
            return { success: false, message: t("action.auth_user"), timestamp };
        }

        const name = formData.get("name") as string | null;
        const bio = formData.get("bio") as string | null;
        const image = formData.get("imagePath") as File | null;

        let imagePath = null;
        if (image) {
            imagePath = await uploadImage(image);
        }

        const data: Partial<EditProfileFormData> = {};
        if (name) data.name = name;
        if (bio) data.bio = bio;
        if (imagePath) data.imagePath = imagePath;

        const result = EditProfileSchema.safeParse(data);

        if (!result.success) {
            console.error("Validation failed:", result.error.formErrors.fieldErrors);
            return { success: false, message: t('forms.edit_profile.validation_err'), timestamp };
        }

        await prisma.user.update({
            where: { id: user.id },
            data
        });

        const redirect = `/${activeLocale}/profile`;

        revalidatePath("/");
        return {
            success: true,
            message: t('forms.edit_profile.success_msg'),
            timestamp,
            data: {
                redirect
            }
        };
    } catch (error) {
        console.error("Edit profile failed:", error);
        return { success: false, message: t('forms.edit_profile.error_msg'), timestamp };
    }
};

export { editProfileAction };
