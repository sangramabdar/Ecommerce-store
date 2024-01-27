"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const http_status_codes_1 = require("http-status-codes");
class RootController {
    static async get(req, res) {
        const responseBody = new responseBodyBuilder_1.default();
        res.statusCode = http_status_codes_1.StatusCodes.OK;
        res.json(responseBody);
    }
}
exports.default = RootController;
