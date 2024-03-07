"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const schemas_1 = require("../schemas");
const validation_1 = require("../utils/validation");
const zod_1 = require("../utils/zod");
const cartRouter = (0, express_1.Router)();
exports.cartRouter = cartRouter;
cartRouter.post("/", validation_1.validateToken, (0, zod_1.validateSchema)(schemas_1.cartItemSchema), controllers_1.addCartItemsToCartController);
cartRouter.get("/", validation_1.validateToken, controllers_1.getCartItemsController);
cartRouter.delete("/", (0, zod_1.validateSchema)(schemas_1.cartItemSchema), controllers_1.deleteProductFromCartController);