import { Router } from "express";
import RootController from "./root.controller";

const rootRouter = Router();

rootRouter.get("/", RootController.get);

export default rootRouter;
