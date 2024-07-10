'use client'

import { followAction } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type Props = {
    user: any
    id: string
}

const Follow = ({ user, id }: Props) => {
    const followed = user?.followers?.find((follow: any) => Number(id) === follow.followerId);
    const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
        followed,
        (state) => !state
    );

    const handleFollow = async () => {
        if (!user) {
            toast("You must be logged in to follow");
            return;
        }

        startTransition(() => {
            switchOptimisticFollow("");
        });
        try {
            await followAction(id, user.id);
        } catch (err) {
            startTransition(() => {
                switchOptimisticFollow("");
            });
        }
    };

    return (
        <Button onClick={handleFollow} className="p-0 text-teal-500" variant="ghost">
            {optimisticFollow ? <Check className="mr-1" size={14} /> : <Plus className="mr-1" size={14} />}
            {optimisticFollow ? "Following" : "Follow"}
        </Button>
    )
}

export { Follow }
