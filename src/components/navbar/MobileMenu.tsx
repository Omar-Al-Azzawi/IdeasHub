'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, Dock, Lightbulb, Monitor, Moon, Sun, User } from "lucide-react";
import SignOutButton from "./SignOutButton"
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { Pivot as Hamburger } from 'hamburger-react'
import { User as UserType } from "@/types/User";

type Props = {
    user: UserType | null
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const MobileMenu = ({ user }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { setTheme } = useTheme();
    const activeLocale = useLocale()
    const t = useTranslations()

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="md:hidden z-50">
            <Hamburger size={24} toggled={isOpen} toggle={setIsOpen} />
            {isOpen && (
                <motion.div
                    className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white dark:bg-[#010816] flex flex-col items-start pl-10 pt-10 gap-8 font-medium text-xl z-50"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {user ?
                        <motion.div className="flex items-center" variants={item}>
                            <User size={20} className="mr-2" />
                            <Link href={`/${activeLocale}/profile`} onClick={handleLinkClick}>
                                {t('navbar.profile')}
                            </Link>
                        </motion.div>
                        : null
                    }
                    {user ?
                        <motion.div className="flex items-center" variants={item}>
                            <Bookmark size={20} className="mr-2" />
                            <Link href={`/${activeLocale}/bookmarks`} onClick={handleLinkClick}>
                                {t('navbar.bookmarks')}
                            </Link>
                        </motion.div>
                        : null
                    }
                    <motion.div className="flex items-center" variants={item}>
                        <Dock size={20} className="mr-2" />
                        <Link href="/" className="flex" onClick={handleLinkClick}>
                            {t('navbar.home')}
                        </Link>
                    </motion.div>
                    <motion.div className="flex items-center" variants={item}>
                        <Lightbulb size={20} className="mr-2" />
                        <Link href={`/${activeLocale}/ideas`} className="flex" onClick={handleLinkClick}>
                            {t('navbar.ideas')}
                        </Link>
                    </motion.div>
                    {user ?
                        <motion.div className="flex items-center" variants={item}>
                            <SignOutButton />
                        </motion.div>
                        :
                        <Link
                            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-teal-500/90 dark:focus-visible:ring-gray-300"
                            href={`/${activeLocale}/login`}
                        >
                            <span>{t('navbar.login')}</span><ArrowRight size={15} className="mt-[2px]" />
                        </Link>
                    }
                    <motion.div className="flex items-center" variants={item}>
                        <Tabs defaultValue="system" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="light" onClick={() => setTheme("light")}>
                                    <Sun size={20} />
                                </TabsTrigger>
                                <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                                    <Moon size={20} />
                                </TabsTrigger>
                                <TabsTrigger value="system" onClick={() => setTheme("system")}>
                                    <Monitor size={20} />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export { MobileMenu }
