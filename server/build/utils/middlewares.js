"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handleClientErrors = exports.invalidPathHandler = void 0;
const responseBodyBuilder_1 = __importDefault(require("./responseBodyBuilder"));
function invalidPathHandler(request, response, next) {
    response.status(404).json({
        error: "invalid path",
    });
}
exports.invalidPathHandler = invalidPathHandler;
async function handleClientErrors(error, req, res, next) {
    if (error.statusCode) {
        const response = new responseBodyBuilder_1.default()
            .setOK(false)
            .setStatusCode(error.statusCode)
            .setErrors([error.message])
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
        .setStatusCode(500)
        .setErrors([error.message])
        .build();
    res.status(500);
    res.json(response);
}
exports.handleServerErrors = handleServerErrors;
