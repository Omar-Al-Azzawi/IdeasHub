import getUserIdeas from "@/queries/get-user-ideas";
import { IdeasTabs } from "./_components/ideasTabs";
import { Header } from "./_components/header";
import { getUser } from "@/lib/lucia";

export default async function ProfilePage() {
    const user = await getUser()
    const { ideas } = await getUserIdeas(String(user?.id));

    return (
        <main className="mx-auto lg:w-[60rem]">
            <div className="mx-8 lg:mx-auto mt-10">
                <Header user={user} edit />
                <IdeasTabs user={user} ideas={ideas} />
            </div>
        </main>
    );
}
