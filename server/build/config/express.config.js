"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const middlewares_1 = require("../utils/middlewares");
const routes_1 = require("../routes");
const environment_config_1 = __importDefault(require("./environment.config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    type: ["json"],
}));
app.use((0, morgan_1.default)(":remote-addr  :method :url :status :res[content-length] - :response-time ms"));
app.use("/api/auth", routes_1.authRouter);
app.use("/api/profile", routes_1.profileRouter);
app.use("/api/carts", routes_1.cartRouter);
app.use("/api/orders", routes_1.orderRouter);
app.use("/api/products", routes_1.productRouter);
app.use("/api/payments", routes_1.paymentRouter);
app.use("*", middlewares_1.invalidPathHandler);
//error middlewares
app.use(middlewares_1.handleClientErrors);
app.use(middlewares_1.handleServerErrors);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(environment_config_1.default.DB_URL, {});
exports.default = app;
