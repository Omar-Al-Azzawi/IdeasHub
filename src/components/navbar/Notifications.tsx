'use client'

import { User } from "@/types/User";
import { BellIcon, CheckIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import formatDate from "@/lib/formatDate";
import { useLocale, useTranslations } from "next-intl";
import { NotificationTypes } from "@/Constant/Index";
import { markAllNotificationsRead, notificationAction } from "@/actions/notification";
import { useRouter } from 'next/navigation';
import { Notifications } from "@/types/Notification";

type Props = {
    user: User | null;
    notifications: Notifications[]
};

const Notification = ({ user, notifications }: Props) => {
    const t = useTranslations();
    const activeLocale = useLocale();
    const router = useRouter();

    if (!user) return null;

    const unReadNotifications = notifications.filter((notification: Notifications) => notification.readAt === null);

    const handleNotificationClick = async (notificationId: number, href: string) => {
        await notificationAction(notificationId);
        router.push(href);
    };

    const handleMarkAllAsRead = async () => {
        if (!user) return;
        await markAllNotificationsRead(String(user?.id));
        window.location.reload();
    };


    return (
        <div className="mx-6 mt-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <BellIcon className="h-6 w-6" />
                        {unReadNotifications.length > 0 ? (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-teal-500" />
                        ) : null}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[400px]">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-medium">{t('notifications.notifications')}</h3>
                        {notifications.length !== 0 ? (
                            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>{t('notifications.mark_all')}</Button>
                        ) : null}
                    </div>
                    {notifications.length !== 0 ? (
                        <ScrollArea className="max-h-[400px] p-2">
                            {notifications.map((notification: Notifications) => {
                                const href =
                                    notification.type === NotificationTypes.LIKE || notification.type === NotificationTypes.COMMENT
                                        ? `/${activeLocale}/ideas/${notification.ideaId}`
                                        : `/${activeLocale}/profile/${notification.issuerId}`;
                                return (
                                    <div className="grid gap-2" key={notification.id}>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                            onClick={() => handleNotificationClick(notification.id, href)}
                                        >
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">{notification.content}</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(String(notification.createdAt))}</p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <CheckIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollArea>
                    ) : (
                        <div className="p-4 text-md">
                            <div className="flex flex-col items-center justify-center p-8">
                                <BellIcon className="h-8 w-8 text-muted-foreground" />
                                <h4 className="mt-4 text-lg font-medium">{t('notifications.no_notifications')}</h4>
                                <p className="text-muted-foreground">{t('notifications.no_notifications_sub')}</p>
                            </div>
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Notification;
