'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LocalSwitcher from "./LocalSwitcher";
import { ModeToggle } from "./ModeToggle";
import { useLocale, useTranslations } from "next-intl";

const navItems = [
    { name: "home", link: "/" },
    { name: "ideas", link: "/ideas" },
];

const NavItems = () => {
    const pathname = usePathname();
    const localActive = useLocale();
    const t = useTranslations()

    return (
        <div className="space-x-4 hidden md:flex lg:justify-center ">
            {navItems.map((navItem: any, idx: number) => (
                <Link
                    key={`link=${idx}`}
                    href={`/${localActive}${navItem.link === "/" ? "" : navItem.link}`}
                    className={cn(
                        "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 hover:text-teal-500 dark:hover:text-teal-500 duration-500",
                        pathname === `/${localActive}${navItem.link === "/" ? "" : navItem.link}`
                            ? "text-teal-500 dark:text-teal-500 font-semibold"
                            : null
                    )}
                >
                    <span className="block sm:hidden">{navItem.icon}</span>
                    <span className="text-sm !cursor-pointer">
                        {t(`navbar.${navItem.name}`)}
                    </span>
                </Link>
            ))}
            <LocalSwitcher />
            <div className="hidden md:block">
                <ModeToggle />
            </div>
        </div>
    )
}

export { NavItems }
