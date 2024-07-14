import { Follower } from "./Follower";
import { Comment, Idea } from "./Idea";
import { Like } from "./Like";

export type User = {
    id: number;
    email: string;
    name?: string | null;
    password: string;
    imagePath?: string;
    bio?: string;
    ideas: Idea[];
    comments: Comment[];
    likes: Like[];
    followers: Follower[];
    following: Follower[];
    createdAt: Date;
}
