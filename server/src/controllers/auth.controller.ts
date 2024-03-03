import { Response, Request } from "express";

import { StatusCodes } from "http-status-codes";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";
import { loginService, signUpService } from "../services";

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

async function verifyTokenController(req: any, res: Response, next) {
  try {
    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(StatusCodes.OK)
      .setData({
        token: req.user.token,
      });

    res.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { loginController, signUpController, verifyTokenController };
