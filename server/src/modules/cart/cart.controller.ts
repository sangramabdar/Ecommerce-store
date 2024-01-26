import { Response, Request } from "express";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { addCartItemsToCartService, getCartItemsService } from "./cart.service";
import { StatusCodes } from "http-status-codes";

async function addCartItemsToCartController(req: Request, res: Response, next) {
  const [data, error] = await addCartItemsToCartService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.OK)
    .setData(data);

  res.status(StatusCodes.OK).json(responseBody);
}

async function getCartItemsController(req: Request, res: Response, next) {
  const [data, error] = await getCartItemsService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.OK)
    .setData(data);

  res.status(StatusCodes.OK).json(responseBody);
}

export { addCartItemsToCartController, getCartItemsController };
