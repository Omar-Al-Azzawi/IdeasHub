import { Follower } from "./Follower";
import { Comment, Idea } from "./Idea";
import { Like } from "./Like";

export type User = {
    id: String;
    email: string;
    name?: string | null;
    password?: string | null;
    imagePath?: string;
    bio?: string;
    ideas: Idea[];
    comments: Comment[];
    likes: Like[];
    followers: Follower[];
    following: Follower[];
    createdAt: Date;
}
