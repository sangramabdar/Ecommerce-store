"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersController = exports.placeOrderController = void 0;
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const order_service_1 = require("./order.service");
const http_status_codes_1 = require("http-status-codes");
async function placeOrderController(req, res, next) {
    const [data, error] = await (0, order_service_1.placeOrderService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(http_status_codes_1.StatusCodes.CREATED)
        .setData(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(responseBody);
}
exports.placeOrderController = placeOrderController;
async function getOrdersController(req, res, next) {
    const [data, error] = await (0, order_service_1.getOrdersService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(http_status_codes_1.StatusCodes.OK)
        .setData(data);
    res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
}
exports.getOrdersController = getOrdersController;
