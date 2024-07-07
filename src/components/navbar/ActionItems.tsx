import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Bookmark, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const ActionItems = () => {
    const localActive = useLocale();
    const t = useTranslations()
    const session = false

    return (
        <div className="hidden md:block mt-2">
            {!session ? (
                <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-teal-500/90 dark:focus-visible:ring-gray-300"
                    href={`/${localActive}/login`}
                >
                    <span className="hidden lg:block">{t('navbar.login')}</span><ArrowRight size={15} className="mt-[2px]" />
                </Link>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {/* <Avatar className="ring-2 ring-teal-500">
                            <AvatarImage src={userImage || ''} />
                            <AvatarFallback className="hover:bg-teal-500 duration-500">
                                {session.name[0].toUpperCase()}
                                {session.name[1].toUpperCase()}
                            </AvatarFallback>
                        </Avatar> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-20 mt-2">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <Link href={`/${localActive}/profile`}>{t('navbar.profile')}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bookmark className="mr-2 h-4 w-4" />
                            <Link href={`/${localActive}/bookmarks`}>{t('navbar.bookmarks')}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export { ActionItems }
