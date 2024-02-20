import { StatusCodes } from "http-status-codes";
import {
  paymentCreateService,
  paymentverfifyService,
} from "../services/payment.service";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { Request, Response } from "express";

async function paymentCreateController(req: Request, res: Response, next) {
  try {
    const data = await paymentCreateService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function paymentVerifyController(req: Request, res: Response, next) {
  try {
    const data = await paymentverfifyService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { paymentCreateController, paymentVerifyController };
