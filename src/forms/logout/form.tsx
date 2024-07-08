"use client";

import { LogOut } from "lucide-react";
import { logout } from "./action";
import { useTranslations } from "next-intl";

const LogoutForm = () => {
    const t = useTranslations()

    return (
        <form action={logout}>
            <div className="flex items-center hover:text-teal-500">
                <LogOut className="mr-2 h-4 w-4" />
                <button className="font-bold">{t('navbar.logout')}</button>
            </div>
        </form>
    );
};

export default LogoutForm;
