"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductController = exports.getProductsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const product_service_1 = require("./product.service");
async function getProductsController(req, res, next) {
    try {
        const products = await (0, product_service_1.getProductsService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(products);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.getProductsController = getProductsController;
async function getProductController(req, res, next) {
    try {
        const product = await (0, product_service_1.getProductService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(product);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.getProductController = getProductController;
