"use server";

import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type LoginFormData, LoginSchema } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const loginAction = async (loginFormData: LoginFormData) => {
    const t = await getTranslations()

    try {
        const result = LoginSchema.safeParse(loginFormData);
        if (result.success === false) {
            console.error("Validation failed:", result.error.flatten().fieldErrors);
            return { success: false, message: "Validation failed" };
        }

        const user = await prisma.user.findUnique({
            where: { email: result.data.email },
        });

        if (!user) {
            return { success: false, message: t("forms.login.user_not_found") };
        }

        const passwordMatch = await new Argon2id().verify(String(user.password), result.data.password,)
        if (!passwordMatch) {
            return { success: false, error: t("forms.login.invalid_password") }
        }
        // successfully login
        const session = await lucia.createSession(String(user.id), {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        revalidatePath("/");
        return { success: true, message: t("forms.login.success_msg") };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: t("forms.login.error_msg") };
    }
};

export { loginAction };
