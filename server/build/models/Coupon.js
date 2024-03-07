"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CouponShema = new mongoose_1.default.Schema({
    discountPrice: {
        type: Number,
        required: true,
    },
    minPrice: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Coupon = mongoose_1.default.model("Coupon", CouponShema);
exports.Coupon = Coupon;
