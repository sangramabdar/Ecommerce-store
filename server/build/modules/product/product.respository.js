"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../../models/Product"));
async function getProducts() {
    const products = await Product_1.default.find();
    return products;
}
exports.getProducts = getProducts;
async function getProductById(id) {
    const product = await Product_1.default.findOne({
        _id: id,
    });
    console.log(product);
    if (!product)
        return null;
    return product;
}
exports.getProductById = getProductById;
