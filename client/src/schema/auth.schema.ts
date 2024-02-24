import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password must be 8 and 20 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password must be 8 and 20 characters"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

type LoginSchema = z.infer<typeof loginSchema>;

export type { LoginSchema, SignUpSchema };
