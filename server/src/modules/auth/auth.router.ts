import { Router } from "express";

import { validateLoginSchema, validateSignUpSchema } from "./auth.dto";
import { loginController, signUpController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateSignUpSchema, signUpController);

authRouter.post("/login", validateLoginSchema, loginController);

export default authRouter;
