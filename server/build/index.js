"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_config_1 = __importDefault(require("./config/environment.config"));
const express_config_1 = __importDefault(require("./config/express.config"));
console.log(environment_config_1.default);
//hello
express_config_1.default.listen(environment_config_1.default.PORT, () => {
    console.log("Server is started on port :", environment_config_1.default.PORT);
});
