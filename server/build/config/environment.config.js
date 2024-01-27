"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV) {
    dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
}
else {
    dotenv_1.default.config({ path: `.env` });
}
exports.default = {
    ENVIRONMENT: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    ACCESS_KEY: process.env.ACCESS_KEY,
    PORT: process.env.PORT,
};
