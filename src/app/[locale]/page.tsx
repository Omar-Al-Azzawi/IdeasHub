import Landing from "@/components/Landing";
import { getUser } from "@/lib/lucia";

export default async function Page() {
    const user = await getUser()

    return (
        <main className="flex min-h-screen flex-col mt-20">
            <Landing user={user} />
        </main>
    );
}
