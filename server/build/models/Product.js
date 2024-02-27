"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSChema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSChema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
exports.productSChema = productSChema;
const Product = mongoose_1.default.model("Product", productSChema);
exports.Product = Product;
