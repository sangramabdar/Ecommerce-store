"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemsController = exports.addCartItemsToCartController = void 0;
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const cart_service_1 = require("./cart.service");
const http_status_codes_1 = require("http-status-codes");
async function addCartItemsToCartController(req, res, next) {
    const [data, error] = await (0, cart_service_1.addCartItemsToCartService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(http_status_codes_1.StatusCodes.OK)
        .setData(data);
    res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
}
exports.addCartItemsToCartController = addCartItemsToCartController;
async function getCartItemsController(req, res, next) {
    const [data, error] = await (0, cart_service_1.getCartItemsService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(http_status_codes_1.StatusCodes.OK)
        .setData(data);
    res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
}
exports.getCartItemsController = getCartItemsController;
