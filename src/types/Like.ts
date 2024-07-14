import { Idea } from "./Idea";
import { User } from "./User";

export type Like = {
    id: number;
    idea: Idea;
    ideaId: number;
    user: User;
    userId: number;
}
