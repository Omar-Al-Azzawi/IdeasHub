import { z } from "zod";

const NewIdeaSchema = z.object({
    title: z.string().min(1),
    content: z.any(),
    imagePath: z.string().optional(),
    published: z.boolean().optional(),
    authorId: z.string(),
    tags: z.array(z.string()),
});

type NewIdeaFormData = z.infer<typeof NewIdeaSchema>;

export { NewIdeaSchema };
export type { NewIdeaFormData };
