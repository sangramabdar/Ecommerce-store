import { Router } from "express";
import { loginSchema, signUpSchema } from "./auth.schema";
import {
  loginController,
  signUpController,
  verifyTokenController,
} from "./auth.controller";
import { validateSchema } from "../../utils/zod";
import { validateToken } from "../../utils/validation";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUpController);

authRouter.post("/login", validateSchema(loginSchema), loginController);

authRouter.get("/verify", validateToken, verifyTokenController);

export default authRouter;
