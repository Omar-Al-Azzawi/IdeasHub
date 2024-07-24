"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SignupSchema } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { generateId } from 'lucia';
import { cookies } from "next/headers"
import { getLocale, getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const signupAction = async (
    prevState: {
        success: boolean;
        message: string;
    },
    formData: FormData
): Promise<{ success: boolean; message: string; timestamp: number; data?: { redirect: string } }> => {
    const t = await getTranslations()
    const activeLocale = await getLocale()
    const timestamp = Date.now();

    try {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const data = {
            name,
            email,
            password
        }

        const result = SignupSchema.safeParse(data);

        if (!result.success) {
            return { success: false, message: t("Validation failed"), timestamp };
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return { success: false, message: t('forms.signup.existingUser'), timestamp }
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

        const redirect = `/${activeLocale}/login`;

        revalidatePath("/");
        return {
            success: true,
            message: t("forms.signup.success_msg"),
            timestamp,
            data: {
                redirect
            }
        };
    } catch (error) {
        console.error("Signup failed:", error);
        return {
            success: false,
            message: t("forms.signup.error_msg"),
            timestamp
        };
    }
};

export { signupAction };
