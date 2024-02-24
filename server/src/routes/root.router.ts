import { Router } from "express";
import { RootController } from "../controllers";

const rootRouter = Router();

rootRouter.get("/", RootController.get);

export { rootRouter };
