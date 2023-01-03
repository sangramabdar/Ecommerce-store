import { Router } from "express";
import {
  addCartItemsToCartController,
  getCartItemsController,
} from "./cart.controller";
import { validateToken } from "../../utils/validation";
import { validateCartDto } from "./cart.dto";

const cartRouter = Router();

cartRouter.put(
  "/",
  validateToken,
  validateCartDto,
  addCartItemsToCartController
);

cartRouter.get("/", validateToken, getCartItemsController);

export default cartRouter;
