import { Response, Request } from "express";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { addCartItemsToCartService, getCartItemsService } from "./cart.service";

async function addCartItemsToCartController(req: Request, res: Response, next) {
  const [data, error] = await addCartItemsToCartService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(200)
    .setData(data);

  res.status(200).json(responseBody);
}

async function getCartItemsController(req: Request, res: Response, next) {
  const [data, error] = await getCartItemsService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(200)
    .setData(data);

  res.status(200).json(responseBody);
}

export { addCartItemsToCartController, getCartItemsController };
