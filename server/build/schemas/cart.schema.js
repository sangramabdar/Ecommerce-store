"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const cartItemSchema = zod_1.z.object({
    productId: zod_1.z
        .string({
        required_error: "productId is required",
    })
        .refine(productId => {
        return mongoose_1.default.Types.ObjectId.isValid(productId);
    }, {
        message: "productId is invalid",
    }),
    quantity: zod_1.z.number({
        required_error: "quantity is required",
    }),
});
exports.cartItemSchema = cartItemSchema;
