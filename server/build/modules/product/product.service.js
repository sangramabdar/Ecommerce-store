"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsService = exports.getProductService = void 0;
const product_respository_1 = require("./product.respository");
async function getProductsService(req) {
    try {
        const products = await (0, product_respository_1.getProducts)();
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
        const product = await (0, product_respository_1.getProductById)(productId);
        return product;
    }
    catch (error) {
        throw error;
    }
}
exports.getProductService = getProductService;
