import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { getProductsService, getProductService } from "../services";

async function getProductsController(req: Request, res: Response, next) {
  try {
    const products = await getProductsService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(products);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function getProductController(req: Request, res: Response, next) {
  try {
    const product = await getProductService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(product);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { getProductsController, getProductController };
