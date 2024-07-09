"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Idea } from "@/types/Idea";
import defaultImage from "@/assets/ideahub.png";
import formatDate from "@/lib/formatDate";
import Image from "next/image";
import { LikeAction } from "@/actions/like";
import { BookmarkAction } from "@/actions/bookmark";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteIdeaForm from "@/forms/delete-idea/form";
import { Bookmark, Check, Ellipsis, Lightbulb, MessageCircle, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { followAction } from "@/actions/follow";
import { useLocale } from "next-intl";

type Props = {
    user: any;
    idea: Idea;
};

const IdeaCard: React.FC<Props> = ({ user, idea }) => {
    const activeLocale = useLocale()
    const [isPending, startTransition] = useTransition()
    const isFollowed = user?.following?.find((follow: any) => idea.author.id === follow.followerId);
    const isLiked = user ? idea.likes.some((like) => like.userId === user.id) : false;
    const isBookmarked = user ? idea.bookmarks.some((bookmark) => bookmark.userId === user.id) : false;

    const [likeState, setLikeState] = useState({
        likeCount: idea.likes.length,
        isLiked
    });

    const [optimisticLike, setOptimisticLike] = useOptimistic(
        likeState,
        (state, value) => {
            return {
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked,
            };
        }
    );

    const [optimisticFollow, setOptimisticFollow] = useOptimistic(
        isFollowed,
        (state) => !state
    );

    const [optimisticBookmark, setOptimisticBookmark] = useOptimistic(
        isBookmarked,
        (state) => !state
    );

    const imagePath = idea.imagePath || defaultImage;

    const handleLike = async () => {
        if (!user) {
            toast("You need to be logged in to like an idea.");
            return;
        }

        try {
            LikeAction(Number(idea.id), user.id);
            setLikeState((state) => ({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked,
            }));
        } catch (err) {
            toast("Something went wrong!");
        }
    };

    const handleBookMark = async () => {
        if (!user) {
            toast("You need to be logged in to bookmark an idea.");
            return;
        }

        startTransition(() => {
            setOptimisticBookmark("");
        });

        try {
            await BookmarkAction(Number(idea.id), user.id);
        } catch (error) {
            toast(`Something went wrong! ${error}`);
            setOptimisticBookmark(isBookmarked);
        }
    }

    const handleFollow = async () => {
        if (!user) {
            toast("You must be logged in to follow");
            return;
        }

        startTransition(() => {
            setOptimisticFollow("");
        });
        try {
            await followAction(idea.author.id, user.id);
        } catch (err) {
            toast("Something went wrong!");
        }
    };

    const authorName = idea?.author?.name ?? "Unknown";
    const authorInitials = authorName.split(" ").map((name) => name[0]).join(" ");

    return (
        <article className="overflow-hidden rounded-lg flex flex-col h-70 backdrop-blur-sm p-2 border">
            <figure>
                <Image
                    src={imagePath}
                    width={600}
                    height={400}
                    alt="idea Post Image"
                    className="w-full h-48 object-cover rounded-lg border"
                />
            </figure>
            <div className="p-2 flex justify-between">
                <Link href={`/${activeLocale}/profile/${idea.author.id}`}>
                    <div className="flex items-center">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={idea.author.imagePath || ""} />
                            <AvatarFallback>{authorInitials}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold text-gray-400 p-2 hover:text-teal-500">{idea?.author?.name}</p>
                    </div>
                </Link>
                {user.id !== idea.author.id ? (
                    <div>
                        <Button onClick={handleFollow} className="p-0 text-teal-500" variant="ghost">
                            {optimisticFollow ? <Check className="mr-1" size={14} /> : <Plus className="mr-1" size={14} />}
                            {optimisticFollow ? "Following" : "Follow"}
                        </Button>
                    </div>
                ) : null}
            </div>
            <div className="px-4 flex-grow">
                <div className="flex justify-between">
                    <time dateTime={formatDate(String(idea.createdAt))} className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(formatDate(String(idea.createdAt)))}
                    </time>
                </div>
                <h3 className="text-lg font-bold py-2">
                    <Link href={`/${activeLocale}/ideas/${idea.id}`}>{idea.title}</Link>
                </h3>
                <div className="flex flex-wrap space-x-2">
                    {idea.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="px-4 py-2 mt-2">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <MessageCircle size={20} strokeWidth={1.5} className="mr-1 hover:stroke-2 hover:text-teal-500 dark:hover:text-teal-500 cursor-pointer" />
                            <span className="text-sm text-gray-700 dark:text-gray-400">{idea.comments.length}</span>
                        </div>
                        <div className="flex items-center">
                            <Lightbulb
                                onClick={handleLike}
                                size={20}
                                strokeWidth={1.5}
                                className={`mr-1 hover:stroke-2 hover:text-yellow-400 dark:hover:text-yellow-400 cursor-pointer ${optimisticLike.isLiked ? "fill-yellow-400 text-yellow-400" : ""}`}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-400">{optimisticLike.likeCount}</span>
                        </div>
                        <div className="flex items-center">
                            <Bookmark
                                onClick={handleBookMark}
                                size={20}
                                strokeWidth={1.5}
                                className={`hover:text-fuchsia-500 cursor-pointer ${optimisticBookmark ? 'fill-fuchsia-500 text-fuchsia-500' : ''}`}
                            />
                        </div>
                    </div>
                    {user && idea.author.id === user.id ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Ellipsis className="cursor-pointer hover:text-teal-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={`/${activeLocale}/ideas/${idea.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="bg-red-500">
                                    <DeleteIdeaForm id={idea.id} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
            </div>
        </article>
    );
};

export default IdeaCard;
