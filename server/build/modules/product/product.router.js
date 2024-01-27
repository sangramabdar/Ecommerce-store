"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validation_1 = require("../../utils/validation");
const productRouter = (0, express_1.Router)();
productRouter.get("/", product_controller_1.getProductsController);
productRouter.get("/:id", validation_1.validateId, product_controller_1.getProductController);
exports.default = productRouter;
