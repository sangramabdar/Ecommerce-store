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

const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "name is required",
      })
      .min(3, {
        message: "name must contain 3 characters",
      }),

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

    confirmPassword: z
      .string({
        required_error: "confirmPassword is required",
      })
      .min(8, {
        message: "confirm password must contain between 8 to 20 characters",
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "password and confirm password must be similar",
  });

type LoginSchema = z.infer<typeof loginSchema>;

type SignUpSchema = z.infer<typeof signUpSchema>;

export { loginSchema, signUpSchema };
export type { LoginSchema, SignUpSchema };
