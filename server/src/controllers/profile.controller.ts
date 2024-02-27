import { StatusCodes } from "http-status-codes";
import { getProfileService } from "../services";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { Request, Response } from "express";

async function getProfileController(req: Request, res: Response, next) {
  try {
    const products = await getProfileService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(products);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { getProfileController };
