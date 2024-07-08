"use server";

import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type LoginFormData, LoginSchema } from "./schema";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"

const prisma = new PrismaClient();

const loginAction = async (loginFormData: LoginFormData) => {
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
            console.error("User not found");
            return { success: false, message: "Invalid email or password" };
        }

        const passwordMatch = await new Argon2id().verify(user.password, result.data.password,)
        if (!passwordMatch) {
            return { success: false, error: "Invalid Credentials!" }
        }
        // successfully login
        const session = await lucia.createSession(String(user.id), {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        if (!passwordMatch) {
            console.error("Password does not match");
            return { success: false, message: "Invalid email or password" };
        }

        revalidatePath("/");
        return { success: true, message: "Logged in successfully" };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: "Login failed. Please try again later." };
    }
};

export { loginAction };
