"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SignupSchema, type SignupFormData } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { generateId } from 'lucia';
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const signupAction = async (signupFormData: SignupFormData) => {
    const t = await getTranslations()

    try {
        const result = SignupSchema.safeParse(signupFormData);

        if (!result.success) {
            return { success: false, message: t("Validation failed") };
        }

        const { name, email, password } = signupFormData as {
            name: string;
            email: string;
            password: string;
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return { error: t('forms.signup.existingUser'), success: false }
        }

        const userId = generateId(15);
        const hashedPassword = await new Argon2id().hash(password)

        const user = await prisma.user.create({
            data: {
                id: userId,
                name,
                email,
                password: hashedPassword,
            },
        });

        const session = await lucia.createSession(user.id.toString(), {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        revalidatePath("/");
        return { success: true, message: t("success_msg") };
    } catch (error) {
        console.error("Signup failed:", error);
        return {
            success: false,
            message: t("error_msg"),
        };
    }
};

export { signupAction };
