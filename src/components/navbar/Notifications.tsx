import { User } from "@/types/User"
import { BellIcon, CheckIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import getNotifications from "@/queries/get-notifications"
import { use } from "react"
import { Button } from "../ui/button"
import formatDate from "@/lib/formatDate"
import { useTranslations } from "next-intl"

type Props = {
    user: User | null
}

const Notification = ({ user }: Props) => {
    if (!user) return null
    const t = useTranslations()
    const notifications = use(getNotifications(String(user.id)))
    const unReadNotifications = notifications.filter((notification) => notification.readAt === null)

    return (
        <div className="mx-6 mt-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <BellIcon className="h-6 w-6" />
                        {unReadNotifications.length > 0 ? <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-teal-500" /> : null}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[400px]">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-medium">{t('notifications.notifications')}</h3>
                        <Button variant="ghost" size="sm">{t('notifications.mark_all')}</Button>
                    </div>
                    <ScrollArea className="max-h-[400px] p-2">
                        {notifications.map((notification) => {
                            return (
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-accent hover:text-accent-foreground">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">{notification.content}</p>
                                            <p className="text-xs text-muted-foreground">{formatDate(String(notification.createdAt))}</p>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <CheckIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Notification
