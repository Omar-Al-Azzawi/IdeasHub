import { z } from "zod";

const EditProfileSchema = z.object({
    name: z.string().min(1).optional(),
    bio: z.string().min(1).optional(),
    imagePath: z.string().optional(),
});

type EditProfileFormData = z.infer<typeof EditProfileSchema>;

export { EditProfileSchema };
export type { EditProfileFormData };
