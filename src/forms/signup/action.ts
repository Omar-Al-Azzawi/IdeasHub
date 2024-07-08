"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SignupSchema, type SignupFormData } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { generateId } from 'lucia';
import { cookies } from "next/headers"

const prisma = new PrismaClient();

const signupAction = async (signupFormData: SignupFormData) => {
    try {
        const result = SignupSchema.safeParse(signupFormData);

        if (!result.success) {
            console.error("Validation failed:", result.error.formErrors.fieldErrors);
            return { success: false, message: "Validation failed" };
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
            return { error: 'User already exists', success: false }
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

        console.log({ user })

        const session = await lucia.createSession(user.id.toString(), {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        revalidatePath("/");
        return { success: true, message: "Signup successfully" };
    } catch (error) {
        console.error("Signup failed:", error);
        return {
            success: false,
            message: "Signup failed. Please try again later.",
        };
    }
};

export { signupAction };
