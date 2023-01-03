"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../utils/validation");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post("/", validation_1.validateToken, order_controller_1.placeOrderController);
orderRouter.get("/", validation_1.validateToken, order_controller_1.getOrdersController);
exports.default = orderRouter;
