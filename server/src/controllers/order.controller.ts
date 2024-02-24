import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { getOrdersService, placeOrderService } from "../services";

async function placeOrderController(req: Request, res: Response, next) {
  try {
    const data = await placeOrderService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.CREATED)
      .setData(data);

    res.status(StatusCodes.CREATED).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function getOrdersController(req: Request, res: Response, next) {
  try {
    const data = await getOrdersService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { placeOrderController, getOrdersController };
