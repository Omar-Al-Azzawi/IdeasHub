import { z } from "zod";

const CommentSchema = z.object({
    content: z.string().min(1, {
        message: "Cannot post an empty comment!",
    }),
});

type CommentFormData = z.infer<typeof CommentSchema>;

export { CommentSchema };
export type { CommentFormData };
