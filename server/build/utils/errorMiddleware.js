"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPageHandler = exports.invalidPathHandler = exports.handleError = exports.handleClientError = void 0;
const responseBodyBuilder_1 = __importDefault(require("./responseBodyBuilder"));
function invalidPathHandler(request, response, next) {
    response.status(404).json({
        error: "invalid path",
    });
}
exports.invalidPathHandler = invalidPathHandler;
function invalidPageHandler(request, response, next) {
    response.redirect("/");
}
exports.invalidPageHandler = invalidPageHandler;
//handle expected error
async function handleClientError(error, req, res, next) {
    const responseBody = new responseBodyBuilder_1.default();
    if (error.statusCode) {
        responseBody.setStatusCode(error.statusCode);
        responseBody.setError(error.message);
        res.status(error.statusCode).json(responseBody);
        return;
    }
    if (error.name === "ValidationError") {
        responseBody.setStatusCode(400);
        responseBody.setError(error.message);
        res.status(400).json(responseBody);
        return;
    }
    next(error);
}
exports.handleClientError = handleClientError;
//handle Unexpected error
async function handleError(error, req, res, next) {
    const responseBody = new responseBodyBuilder_1.default();
    responseBody.setStatusCode(500);
    responseBody.setError(error.message);
    res.status(500).json(responseBody);
}
exports.handleError = handleError;
