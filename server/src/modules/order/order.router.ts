import { Router } from "express";
import { validateToken } from "../../utils/validation";
import { getOrdersController, placeOrderController } from "./order.controller";
const orderRouter = Router();

orderRouter.post("/", validateToken, placeOrderController);
orderRouter.get("/", validateToken, getOrdersController);

export default orderRouter;
