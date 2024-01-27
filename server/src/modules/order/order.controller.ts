import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { Response, Request } from "express";
import { getOrdersService, placeOrderService } from "./order.service";
import { StatusCodes } from "http-status-codes";

async function placeOrderController(req: Request, res: Response, next) {
  const [data, error] = await placeOrderService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.CREATED)
    .setData(data);

  res.status(StatusCodes.CREATED).json(responseBody);
}

async function getOrdersController(req: Request, res: Response, next) {
  const [data, error] = await getOrdersService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.OK)
    .setData(data);

  res.status(StatusCodes.OK).json(responseBody);
}

export { placeOrderController, getOrdersController };
