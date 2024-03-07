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
const signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email("invalid email"),
    password: zod_1.z.string().min(6, "password must be 8 and 20 characters"),
    firstName: zod_1.z.string().min(1, "required"),
    lastName: zod_1.z.string().min(1, "required"),
});
exports.signUpSchema = signUpSchema;
