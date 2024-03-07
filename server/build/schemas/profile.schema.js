"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
const updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "required"),
    lastName: zod_1.z.string().min(1, "required"),
});
exports.updateProfileSchema = updateProfileSchema;
