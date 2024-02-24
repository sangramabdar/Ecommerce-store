import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import {
  addCartItemsToCartService,
  deleteProductFromCartService,
  getCartItemsService,
} from "../services";

async function addCartItemsToCartController(req: Request, res: Response, next) {
  try {
    await addCartItemsToCartService(req);

    const responseBody = new ResponseBodyBuilder().setStatusCode(
      StatusCodes.CREATED
    );

    res.status(StatusCodes.CREATED).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function deleteProductFromCartController(
  req: Request,
  res: Response,
  next
) {
  try {
    await deleteProductFromCartService(req);

    const responseBody = new ResponseBodyBuilder().setStatusCode(
      StatusCodes.NO_CONTENT
    );

    res.status(StatusCodes.NO_CONTENT).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function getCartItemsController(req: Request, res: Response, next) {
  try {
    const data = await getCartItemsService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export {
  addCartItemsToCartController,
  getCartItemsController,
  deleteProductFromCartController,
};
