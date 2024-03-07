"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerifyController = exports.paymentCreateController = void 0;
const http_status_codes_1 = require("http-status-codes");
const payment_service_1 = require("../services/payment.service");
const responseBodyBuilder_1 = __importDefault(require("../utils/responseBodyBuilder"));
async function paymentCreateController(req, res, next) {
    try {
        const data = await (0, payment_service_1.paymentCreateService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.paymentCreateController = paymentCreateController;
async function paymentVerifyController(req, res, next) {
    try {
        const data = await (0, payment_service_1.paymentverfifyService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.CREATED)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.paymentVerifyController = paymentVerifyController;
