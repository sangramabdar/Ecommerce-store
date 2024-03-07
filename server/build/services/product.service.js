"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsService = exports.getProductService = void 0;
const repositories_1 = require("../repositories");
const exceptions_1 = require("../utils/exceptions");
async function getProductsService(req) {
    try {
        const products = await (0, repositories_1.getProducts)();
        if (!products) {
            throw new exceptions_1.NotFound("products");
        }
        return products;
    }
    catch (error) {
        throw error;
    }
}
exports.getProductsService = getProductsService;
async function getProductService(req) {
    try {
        const productId = req.params.id;
        const product = await (0, repositories_1.getProductById)(productId);
        if (!product) {
            throw new exceptions_1.NotFound("product");
        }
        return product;
    }
    catch (error) {
        throw error;
    }
}
exports.getProductService = getProductService;
