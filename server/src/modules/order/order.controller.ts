import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { Response, Request } from "express";
import { getOrdersService, placeOrderService } from "./order.service";

async function placeOrderController(req: Request, res: Response, next) {
  const [data, error] = await placeOrderService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(201)
    .setData(data);

  res.status(201).json(responseBody);
}

async function getOrdersController(req: Request, res: Response, next) {
  const [data, error] = await getOrdersService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(201)
    .setData(data);

  res.status(201).json(responseBody);
}

export { placeOrderController, getOrdersController };
