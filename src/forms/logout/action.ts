import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => {
    const sessionCookie = await lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/authenticate')
}
