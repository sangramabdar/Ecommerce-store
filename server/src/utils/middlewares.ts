import { Response, Request, NextFunction } from "express";
import ResponseBodyBuilder from "./responseBodyBuilder";
import { StatusCodes } from "http-status-codes";

function invalidPathHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const responseBody = new ResponseBodyBuilder()
    .setOK(false)
    .setStatusCode(StatusCodes.NOT_FOUND)
    .setErrors(["not found"])
    .build();

  response.status(StatusCodes.NOT_FOUND).json(responseBody);
}

async function handleClientErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.statusCode) {
    const response = new ResponseBodyBuilder()
      .setOK(false)
      .setStatusCode(error.statusCode)
      .setErrors([error.message])
      .build();

    res.status(error.statusCode);
    res.json(response);
    return;
  }

  next(error);
}

async function handleServerErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response = new ResponseBodyBuilder()
    .setOK(false)
    .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
    .setErrors([error.message])
    .build();

  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json(response);
}

export { invalidPathHandler, handleClientErrors, handleServerErrors };
