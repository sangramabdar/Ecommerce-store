import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "./product.controller";
import { validateId } from "../../utils/validation";

const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.get("/:id", validateId, getProductController);

export default productRouter;
