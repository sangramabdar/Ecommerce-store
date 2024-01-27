"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "email is required",
    })
        .email({
        message: "email is not valid",
    }),
    password: zod_1.z
        .string({
        required_error: "password is required",
    })
        .min(8, {
        message: "password must contain between 8 to 20 characters",
    }),
});
exports.loginSchema = loginSchema;
const signUpSchema = zod_1.z
    .object({
    name: zod_1.z
        .string({
        required_error: "name is required",
    })
        .min(3, {
        message: "name must contain 3 characters",
    }),
    email: zod_1.z
        .string({
        required_error: "email is required",
    })
        .email({
        message: "email is not valid",
    }),
    password: zod_1.z
        .string({
        required_error: "password is required",
    })
        .min(8, {
        message: "password must contain between 8 to 20 characters",
    }),
    confirmPassword: zod_1.z
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
exports.signUpSchema = signUpSchema;
