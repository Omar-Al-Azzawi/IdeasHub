import React from "react";
import getUser from "@/queries/get-user";
import { getUser as getAuthUser } from "@/lib/lucia";
import getUserIdeas from "@/queries/get-user-ideas";
import { IdeasTabs } from "../_components/ideasTabs";
import { Header } from "../_components/header";
import { getTranslations } from "next-intl/server";

type Props = {
    params: {
        id: string;
    };
};

export default async function ProfilePage({ params }: Props) {
    const { id } = params;
    const authUser = await getAuthUser()
    const user = await getUser(id);
    const t = await getTranslations()

    if (!user) {
        return (
            <main className="mx-auto min-h-screen lg:w-[60rem]">
                <div className="mx-8 lg:mx-auto mt-10">
                    <p>{t('pages.profile.not_found')}</p>
                </div>
            </main>
        );
    }

    const { ideas } = await getUserIdeas(String(user.id));

    return (
        <main className="mx-auto min-h-screen lg:w-[60rem]">
            <div className="mx-8 lg:mx-auto mt-10">
                <Header user={user} authUser={authUser} />
                <IdeasTabs user={user} ideas={ideas} />
            </div>
        </main>
    );
}
