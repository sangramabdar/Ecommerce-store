import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "email is not valid",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, {
      message: "password must contain between 8 to 20 characters",
    }),
});

const signUpSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be 8 and 20 characters"),
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

type SignUpSchema = z.infer<typeof signUpSchema>;

export { loginSchema, signUpSchema };
export type { LoginSchema, SignUpSchema };
