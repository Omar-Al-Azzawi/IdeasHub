import { Main } from "@/components/Main";
import { Bookmark } from "lucide-react";
import getBookmarks from "@/queries/get-bookmarks";
import IdeasList from "../ideas/_components/IdeasList";
import { getUser } from "@/lib/lucia";
import { getTranslations } from "next-intl/server";

export default async function BookMarksPage() {
    const t = await getTranslations()
    const searchQuery = "";
    const skip = 0;
    const take = 9;

    const user = await getUser()
    const { ideas, total } = await getBookmarks(String(user?.id), searchQuery, skip, take);

    if (total === 0) {
        return (
            <Main>
                <div className="h-screen flex flex-col gap-4 items-center">
                    <Bookmark size={40} className="" />
                    <h1 className="text-4xl">{t('pages.bookmarks.empty_title')}</h1>
                    <p className="text-sm text-center text-slate-500">{t('pages.bookmarks.empty_sub_title')}</p>
                </div>
            </Main>
        )
    }

    return (
        <main className="flex min-h-screen flex-col p-2 lg:px-24">
            <h1 className="text-4xl m-10">{t('pages.bookmarks.title')}</h1>
            <IdeasList
                user={user}
                ideas={ideas}
            />
        </main>
    );
}
