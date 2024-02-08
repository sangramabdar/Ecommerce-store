import { Router } from "express";
import {
  addCartItemsToCartController,
  deleteProductFromCartController,
  getCartItemsController,
} from "../controllers";
import { cartItemSchema } from "../schemas";
import { validateToken } from "../utils/validation";
import { validateSchema } from "../utils/zod";

const cartRouter = Router();

cartRouter.post(
  "/",
  validateToken,
  validateSchema(cartItemSchema),
  addCartItemsToCartController
);

cartRouter.get("/", validateToken, getCartItemsController);
cartRouter.delete(
  "/",
  validateSchema(cartItemSchema),
  deleteProductFromCartController
);

export { cartRouter };
