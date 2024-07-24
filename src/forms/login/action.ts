"use server";

import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { LoginSchema } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const loginAction = async (
    prevState: {
        success: boolean;
        message: string;
    },
    formData: FormData
): Promise<{ success: boolean; message: string; timestamp: number; data?: { redirect: string } }> => {
    const t = await getTranslations()
    const timestamp = Date.now();

    try {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const data = {
            email,
            password
        }

        const result = LoginSchema.safeParse(data);

        if (result.success === false) {
            console.error("Validation failed:", result.error.flatten().fieldErrors);
            return { success: false, message: "Validation failed", timestamp };
        }

        const user = await prisma.user.findUnique({
            where: { email: result.data.email },
        });

        if (!user) {
            return { success: false, message: t("forms.login.user_not_found"), timestamp };
        }

        const passwordMatch = await new Argon2id().verify(String(user.password), result.data.password,)
        if (!passwordMatch) {
            return { success: false, message: t("forms.login.invalid_password"), timestamp }
        }

        const session = await lucia.createSession(String(user.id), {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        const redirect = `/`;

        revalidatePath("/");
        return {
            success: true,
            message: t("forms.login.success_msg"),
            timestamp,
            data: {
                redirect
            }
        };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: t("forms.login.error_msg"), timestamp };
    }
};

export { loginAction };
