import { Router } from "express";
import { validateToken } from "../utils/validation";
import {
  paymentCreateController,
  paymentVerifyController,
} from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create", validateToken, paymentCreateController);
paymentRouter.post("/verify", validateToken, paymentVerifyController);

export { paymentRouter };
