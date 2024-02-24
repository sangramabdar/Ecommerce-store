import { Router } from "express";
import { getProductController, getProductsController } from "../controllers";
import { validateId } from "../utils/validation";

const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.get("/:id", validateId, getProductController);

export { productRouter };
