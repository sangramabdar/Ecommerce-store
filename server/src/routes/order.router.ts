import { Router } from "express";
import { placeOrderController, getOrdersController } from "../controllers";
import { orderAddressSchema } from "../schemas";
import { validateToken } from "../utils/validation";
import { validateSchema } from "../utils/zod";

const orderRouter = Router();

orderRouter.post(
  "/",
  validateToken,
  validateSchema(orderAddressSchema),
  placeOrderController
);

orderRouter.get("/", validateToken, getOrdersController);

export { orderRouter };
