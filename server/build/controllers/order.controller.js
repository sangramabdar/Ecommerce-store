"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersController = exports.placeOrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseBodyBuilder_1 = __importDefault(require("../utils/responseBodyBuilder"));
const services_1 = require("../services");
async function placeOrderController(req, res, next) {
    try {
        const data = await (0, services_1.placeOrderService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.CREATED)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.placeOrderController = placeOrderController;
async function getOrdersController(req, res, next) {
    try {
        const data = await (0, services_1.getOrdersService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.getOrdersController = getOrdersController;
