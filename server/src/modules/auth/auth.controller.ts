import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { StatusCodes } from "http-status-codes";

async function loginController(req: Request, res: Response, next) {
  try {
    const data = await loginService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData(data);

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function signUpController(req: Request, res: Response, next) {
  try {
    const data = await signUpService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.CREATED)
      .setData(data);

    res.status(StatusCodes.CREATED).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { loginController, signUpController };
