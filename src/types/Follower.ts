import { User } from "./User";

export type Follower = {
    id: number;
    follower: User;
    followerId: string;
    following: User;
    followingId: string;
    createdAt: Date;
}
