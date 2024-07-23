'use client';

import { followAction } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type Follower = {
    followerId: string;
};

type Props = {
    user: User;
    authUser?: User | null
};

const Follow = ({ user, authUser }: Props) => {
    const t = useTranslations()
    const followed = user?.followers?.some((follow: Follower) => follow.followerId === user.id);
    const [optimisticFollow, setOptimisticFollow] = useOptimistic<boolean>(followed);

    const handleFollow = async () => {
        if (!user) {
            toast("You must be logged in to follow");
            return;
        }

        startTransition(() => {
            setOptimisticFollow((prev) => !prev);
        });

        try {
            await followAction(String(user?.id), String(authUser?.id));
        } catch (err) {
            startTransition(() => {
                setOptimisticFollow((prev) => !prev);
            });
        }
    };

    return (
        <Button onClick={handleFollow} className="p-0 text-teal-500" variant="ghost">
            {optimisticFollow ? <Check className="mr-1" size={14} /> : <Plus className="mr-1" size={14} />}
            {optimisticFollow ? t('action.following') : t('action.follow')}
        </Button>
    );
};

export { Follow };
