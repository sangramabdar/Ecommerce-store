"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = exports.Unauthenticated = exports.BadRequest = exports.CustomError = exports.Unauthorized = exports.NotRegistered = exports.EmailExists = exports.WrongContent = exports.NotFound = exports.DataBaseConnectionError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = null;
        this.statusCode = statusCode;
    }
    setMessage(message) {
        this.message = message;
    }
}
exports.CustomError = CustomError;
class BadRequest extends CustomError {
    constructor(message = "bad request") {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.BadRequest = BadRequest;
class DataBaseConnectionError extends CustomError {
    constructor() {
        super(DataBaseConnectionError.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.DataBaseConnectionError = DataBaseConnectionError;
DataBaseConnectionError.message = "db connection error";
class NotFound extends CustomError {
    constructor(entity) {
        super(`${entity} ${NotFound.message}`, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFound = NotFound;
NotFound.message = "not found";
class WrongContent extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.WrongContent = WrongContent;
class EmailExists extends CustomError {
    constructor() {
        super(EmailExists.message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.EmailExists = EmailExists;
EmailExists.message = "email already exists";
class NotRegistered extends CustomError {
    constructor() {
        super(NotRegistered.message, 401);
    }
}
exports.NotRegistered = NotRegistered;
NotRegistered.message = "email is not registered";
class Unauthorized extends CustomError {
    constructor() {
        super(Unauthorized.message, http_status_codes_1.StatusCodes.FORBIDDEN);
    }
}
exports.Unauthorized = Unauthorized;
Unauthorized.message = "forbidden";
class Unauthenticated extends CustomError {
    constructor() {
        super(Unauthenticated.message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.Unauthenticated = Unauthenticated;
Unauthenticated.message = "unauthorized";
class TokenError extends CustomError {
    constructor() {
        super(TokenError.message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.TokenError = TokenError;
TokenError.message = "token is invalid";
