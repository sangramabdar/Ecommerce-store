import { Router } from "express";

import { loginSchema, signUpSchema } from "./auth.schema";
import { loginController, signUpController } from "./auth.controller";
import { validateSchema } from "../../utils/zod";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUpController);

authRouter.post("/login", validateSchema(loginSchema), loginController);

export default authRouter;
