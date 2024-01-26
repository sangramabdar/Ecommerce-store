import { Response, Request, NextFunction } from "express";
import { CustomError } from "./exceptions";
import ResponseBodyBuilder from "./responseBodyBuilder";

function invalidPathHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const responseBody = new ResponseBodyBuilder()
    .setOK(false)
    .setStatusCode(404)
    .setErrors(["not found"])
    .build();

  response.status(404).json(responseBody);
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
    .setStatusCode(500)
    .setErrors([error.message])
    .build();

  res.status(500);
  res.json(response);
}

export { invalidPathHandler, handleClientErrors, handleServerErrors };
