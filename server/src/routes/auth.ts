import { Router } from "express";
import {
  signUpController,
  loginController,
  verifyTokenController,
} from "../controllers/auth";
import { validateToken } from "../utils/validation";
import { validateSchema } from "../utils/zod";
import { loginSchema, signUpSchema } from "../schemas";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUpController);

authRouter.post("/login", validateSchema(loginSchema), loginController);

authRouter.get("/verify", validateToken, verifyTokenController);

export { authRouter };
