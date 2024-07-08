'use client'

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/signout";

const SignOutButton = () => {
    const t = useTranslations()

    return (
        <div className="flex items-center hover:text-teal-500">
            <Button variant="outline" onClick={() => logout()} className="font-bold"><LogOut className="mr-2 h-4 w-4" />{t('navbar.logout')}</Button>
        </div>
    );
};

export default SignOutButton;
