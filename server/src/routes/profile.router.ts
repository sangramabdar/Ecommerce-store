import { Router } from "express";
import { getProfileController, updateProfileController } from "../controllers";
import { validateToken } from "../utils/validation";
import { validateSchema } from "../utils/zod";
import { updateProfileSchema } from "../schemas/profile.schema";

const profileRouter = Router();

profileRouter.use(validateToken);

profileRouter.get("/", getProfileController);
profileRouter.put(
  "/",
  validateSchema(updateProfileSchema),
  updateProfileController
);

export { profileRouter };
