import { Request, Response } from "express";
import { CustomError } from "../../utils/exceptions";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "email is not valid",
    }),
  password: z.string().min(8, {
    message: "password must contain between 8 to 20 characters",
  }),
});

type LoginType = z.infer<typeof loginSchema>;

async function validateLoginSchema(req: Request, res: Response, next) {
  try {
    req.body = await loginSchema.parseAsync(req.body);
    next();
  } catch (error) {
    error = new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST);
    next(error);
  }
}

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

type SignUpType = z.infer<typeof loginSchema>;

async function validateSignUpSchema(req: Request, res: Response, next) {
  try {
    req.body = await signUpSchema.parseAsync(req.body);
    console.log(req.body);
    next();
  } catch (error) {
    error = new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST);
    next(error);
  }
}

export { validateLoginSchema, validateSignUpSchema, SignUpType, LoginType };
