import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Follow } from "./followButton";
import { UserCog, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { User } from "@/types/User";

type Props = {
    user: User | null;
    authUser?: User | null
    edit?: boolean;
};

const getAvatarFallback = (name?: string) => {
    if (!name) return "??";
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("");
    return initials.toUpperCase();
};

const Header = ({ user, authUser, edit }: Props) => {
    const activeLocale = useLocale();
    const t = useTranslations()

    return (
        <header className="py-8 border-b">
            <div className="md:flex md:justify-between">
                <div className="flex items-center space-x-6">
                    <Avatar className="h-28 w-28 lg:h-32 lg:w-32 ring-2 ring-teal-500">
                        <AvatarImage src={user?.imagePath || ''} />
                        <AvatarFallback>{getAvatarFallback(user?.name || '')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div>
                            <h1 className="text-lg lg:text-2xl font-bold">{user?.name || ''}</h1>
                            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p>{t('pages.profile.followers')}</p>
                                    <div className="flex items-center space-x-1">
                                        <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {user?.followers.length || 0}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p>{t('pages.profile.following')}</p>
                                    <div className="flex items-center space-x-1">
                                        <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {user?.following.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {user && (
                    <div className="mt-4 lg:mt-0">
                        {edit ? (
                            <Button asChild size='sm' className="hover:bg-teal-500">
                                <Link href={`/${activeLocale}/profile/edit`}>
                                    <UserCog size={20} className="mr-2" />
                                    {t('pages.profile.edit')}
                                </Link>
                            </Button>
                        ) : (
                            <Follow user={user} authUser={authUser} />
                        )}
                    </div>
                )}
            </div>
            <div className="mt-8 mx-4">
                <h2 className="text-lg font-semibold">Bio</h2>
                <p className="text-gray-500 dark:text-gray-400">{user?.bio}</p>
            </div>
        </header>
    );
};

export { Header };
