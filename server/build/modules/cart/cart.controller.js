"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemsController = exports.addCartItemsToCartController = void 0;
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const cart_service_1 = require("./cart.service");
async function addCartItemsToCartController(req, res, next) {
    const [data, error] = await (0, cart_service_1.addCartItemsToCartService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(200)
        .setData(data);
    res.status(200).json(responseBody);
}
exports.addCartItemsToCartController = addCartItemsToCartController;
async function getCartItemsController(req, res, next) {
    const [data, error] = await (0, cart_service_1.getCartItemsService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(200)
        .setData(data);
    res.status(200).json(responseBody);
}
exports.getCartItemsController = getCartItemsController;
