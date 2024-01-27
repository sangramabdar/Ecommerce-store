"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handleClientErrors = exports.invalidPathHandler = void 0;
const responseBodyBuilder_1 = __importDefault(require("./responseBodyBuilder"));
const http_status_codes_1 = require("http-status-codes");
function invalidPathHandler(request, response, next) {
    const responseBody = new responseBodyBuilder_1.default()
        .setOK(false)
        .setStatusCode(http_status_codes_1.StatusCodes.NOT_FOUND)
        .setError({
        message: "not found",
    })
        .build();
    response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(responseBody);
}
exports.invalidPathHandler = invalidPathHandler;
async function handleClientErrors(error, req, res, next) {
    if (error.statusCode) {
        const response = new responseBodyBuilder_1.default()
            .setOK(false)
            .setStatusCode(error.statusCode)
            .setError({ message: error.message })
            .build();
        res.status(error.statusCode);
        res.json(response);
        return;
    }
    next(error);
}
exports.handleClientErrors = handleClientErrors;
async function handleServerErrors(error, req, res, next) {
    const response = new responseBodyBuilder_1.default()
        .setOK(false)
        .setStatusCode(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .setError([error.message])
        .build();
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    res.json(response);
}
exports.handleServerErrors = handleServerErrors;
