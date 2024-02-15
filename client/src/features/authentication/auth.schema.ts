import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup.string().required("Required"),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup
    .string()
    .required("Required")
    .min(6, "password must be 8 and 20 characters"),
});

type LoginSchema = yup.InferType<typeof loginSchema>;

type SignUpSchema = yup.InferType<typeof signUpSchema>;

export type { LoginSchema, SignUpSchema };
