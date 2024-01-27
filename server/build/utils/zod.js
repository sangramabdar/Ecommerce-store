"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const http_status_codes_1 = require("http-status-codes");
const exceptions_1 = require("./exceptions");
function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            error = new exceptions_1.CustomError(error.errors[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST);
            next(error);
        }
    };
}
exports.validateSchema = validateSchema;
