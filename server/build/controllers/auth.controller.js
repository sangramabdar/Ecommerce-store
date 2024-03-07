"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenController = exports.signUpController = exports.loginController = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseBodyBuilder_1 = __importDefault(require("../utils/responseBodyBuilder"));
const services_1 = require("../services");
async function loginController(req, res, next) {
    try {
        const data = await (0, services_1.loginService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.loginController = loginController;
async function signUpController(req, res, next) {
    try {
        const data = await (0, services_1.signUpService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.CREATED)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.signUpController = signUpController;
async function verifyTokenController(req, res, next) {
    try {
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData({
            token: req.user.token,
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.verifyTokenController = verifyTokenController;
