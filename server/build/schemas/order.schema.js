"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderAddressSchema = void 0;
const zod_1 = require("zod");
const orderAddressSchema = zod_1.z.object({
    address: zod_1.z.string({ required_error: "addesss is required" }),
    city: zod_1.z.string({ required_error: "city is required" }),
    state: zod_1.z.string({ required_error: "state is required" }),
    paymentMode: zod_1.z.enum(["CASH", "ONLINE"], {
        required_error: "payment mode is invalid",
    }),
});
exports.orderAddressSchema = orderAddressSchema;
