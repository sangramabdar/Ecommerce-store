import { Router } from "express";
import { getProfileController } from "../controllers";
import { validateToken } from "../utils/validation";

const profileRouter = Router();

profileRouter.get("/", validateToken, getProfileController);

export { profileRouter };
