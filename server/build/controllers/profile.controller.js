"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileController = exports.getProfileController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
const responseBodyBuilder_1 = __importDefault(require("../utils/responseBodyBuilder"));
async function getProfileController(req, res, next) {
    try {
        const profile = await (0, services_1.getProfileService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(profile);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.getProfileController = getProfileController;
async function updateProfileController(req, res, next) {
    try {
        const data = await (0, services_1.updateProdfileService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(http_status_codes_1.StatusCodes.OK)
            .setData(data);
        res.status(http_status_codes_1.StatusCodes.OK).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.updateProfileController = updateProfileController;
