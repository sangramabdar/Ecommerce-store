"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBodyBuilder {
    constructor() {
        this.timeStamp = Date.now();
        this.errors = [];
        this.statusCode = 200;
        this.data = null;
        this.ok = true;
    }
    setErrors(errors) {
        this.errors = errors;
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
