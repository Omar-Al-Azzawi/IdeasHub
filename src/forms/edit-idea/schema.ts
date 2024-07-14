import { z } from "zod";

const EditIdeaSchema = z.object({
    title: z.string().min(1),
    content: z.any(),
    imagePath: z.string().optional(),
    published: z.boolean().optional(),
    tags: z.string().array()
});

type EditIdeaFormData = z.infer<typeof EditIdeaSchema>;

export { EditIdeaSchema };
export type { EditIdeaFormData };
