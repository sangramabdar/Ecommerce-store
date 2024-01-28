import { Router } from "express";
import { validateToken } from "../../utils/validation";
import { getOrdersController, placeOrderController } from "./order.controller";
import { validateSchema } from "../../utils/zod";
import { orderAddressSchema } from "./order.schema";
const orderRouter = Router();

orderRouter.post(
  "/",
  validateToken,
  validateSchema(orderAddressSchema),
  placeOrderController
);
orderRouter.get("/", validateToken, getOrdersController);

export default orderRouter;
