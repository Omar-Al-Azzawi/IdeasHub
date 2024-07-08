import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export { LoginSchema };
export type { LoginFormData };
