"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const models_1 = require("../models");
async function getProducts() {
    const products = await models_1.Product.find();
    if (!products)
        return null;
    return products;
}
exports.getProducts = getProducts;
async function getProductById(id) {
    const product = await models_1.Product.findOne({
        _id: id,
    });
    if (!product)
        return null;
    return product;
}
exports.getProductById = getProductById;
