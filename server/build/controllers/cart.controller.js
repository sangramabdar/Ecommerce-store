"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartController = exports.getCartItemsController = exports.addCartItemsToCartController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseBodyBuilder_1 = __importDefault(require("../utils/responseBodyBuilder"));
const services_1 = require("../services");
async function addCartItemsToCartController(req, res, next) {
    try {
        await (0, services_1.addCartItemsToCartService)(req);
        const responseBody = new responseBodyBuilder_1.default().setStatusCode(http_status_codes_1.StatusCodes.CREATED);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.addCartItemsToCartController = addCartItemsToCartController;
async function deleteProductFromCartController(req, res, next) {
    try {
        await (0, services_1.deleteProductFromCartService)(req);
        const responseBody = new responseBodyBuilder_1.default().setStatusCode(http_status_codes_1.StatusCodes.NO_CONTENT);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteProductFromCartController = deleteProductFromCartController;
async function getCartItemsController(req, res, next) {
    try {
        const data = await (0, services_1.getCartItemsService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.getCartItemsController = getCartItemsController;
