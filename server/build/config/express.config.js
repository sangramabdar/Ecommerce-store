"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const cart_router_1 = __importDefault(require("../modules/cart/cart.router"));
const order_router_1 = __importDefault(require("../modules/order/order.router"));
const root_router_1 = __importDefault(require("../modules/root/root.router"));
const middlewares_1 = require("../utils/middlewares");
const product_router_1 = __importDefault(require("../modules/product/product.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    type: ["json"],
}));
app.use((0, morgan_1.default)(":remote-addr  :method :url :status :res[content-length] - :response-time ms"));
app.use("/", root_router_1.default);
app.use("/api/auth", auth_router_1.default);
app.use("/api/carts", cart_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/products", product_router_1.default);
app.use("*", middlewares_1.invalidPathHandler);
//error middlewares
app.use(middlewares_1.handleClientErrors);
app.use(middlewares_1.handleServerErrors);
mongoose_1.default.connect(process.env.DB_URL, {});
exports.default = app;
