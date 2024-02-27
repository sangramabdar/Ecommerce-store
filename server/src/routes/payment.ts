import { Router } from "express";
import { validateToken } from "../utils/validation";
import {
  paymentCreateController,
  paymentVerifyController,
} from "../controllers/payment";

const paymentRouter = Router();

paymentRouter.get("/proceed", validateToken, paymentCreateController);
paymentRouter.post("/verify", validateToken, paymentVerifyController);

export { paymentRouter };
