"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class ResponseBodyBuilder {
    constructor() {
        this.statusCode = http_status_codes_1.StatusCodes.OK;
        this.ok = true;
    }
    setError(error) {
        this.error = error;
        return this;
    }
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setOK(ok) {
        this.ok = ok;
        return this;
    }
    build() {
        return this;
    }
}
exports.default = ResponseBodyBuilder;
