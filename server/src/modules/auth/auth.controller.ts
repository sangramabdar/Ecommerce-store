import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { StatusCodes } from "http-status-codes";

async function loginController(req: Request, res: Response, next) {
  const [data, error] = await loginService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.OK)
    .setData(data);

  res.status(StatusCodes.OK).json(responseBody);
}

async function signUpController(req: Request, res: Response, next) {
  const [data, error] = await signUpService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(StatusCodes.CREATED)
    .setData(data);

  res.status(StatusCodes.CREATED).json(responseBody);
}

export { loginController, signUpController };
