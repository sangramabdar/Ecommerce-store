import { Router } from "express";
import {
  addCartItemsToCartController,
  getCartItemsController,
} from "./cart.controller";
import { validateToken } from "../../utils/validation";
import { cartItemSchema } from "./cart.schema";
import { validateSchema } from "../../utils/zod";

const cartRouter = Router();

cartRouter.put(
  "/",
  validateToken,
  validateSchema(cartItemSchema),
  addCartItemsToCartController
);

cartRouter.get("/", validateToken, getCartItemsController);

export default cartRouter;
