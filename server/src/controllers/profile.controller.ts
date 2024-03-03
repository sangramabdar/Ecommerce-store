import { StatusCodes } from "http-status-codes";
import { getProfileService, updateProdfileService } from "../services";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { Request, Response } from "express";

async function getProfileController(req: Request, res: Response, next) {
  try {
    const profile = await getProfileService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(profile);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function updateProfileController(req: Request, res: Response, next) {
  try {
    const data = await updateProdfileService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { getProfileController, updateProfileController };
