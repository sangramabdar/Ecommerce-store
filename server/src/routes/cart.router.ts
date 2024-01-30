import { Router } from "express";
import {
  addCartItemsToCartController,
  getCartItemsController,
} from "../controllers";
import { cartItemSchema } from "../schemas";
import { validateToken } from "../utils/validation";
import { validateSchema } from "../utils/zod";

const cartRouter = Router();

cartRouter.put(
  "/",
  validateToken,
  validateSchema(cartItemSchema),
  addCartItemsToCartController
);

cartRouter.get("/", validateToken, getCartItemsController);

export { cartRouter };
