import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  BadRequest,
  CustomError,
  NotFound,
  TokenError,
  Unauthenticated,
  Unauthorized,
} from "./exceptions";
import { verifyAccessToken } from "./jwt";

async function validateId(req: Request, res: Response, next) {
  let id = req.params["id"];
  let isValid = ObjectId.isValid(id);
  if (!isValid) {
    let error = new BadRequest("id is in wrong format");
    return next(error);
  }
  next();
}

async function validateBody(req: Request, res: Response, next) {
  if (Object.keys(req.body).length == 0) {
    let error = new BadRequest("id is in wrong format");
    return next(error);
  }

  next();
}

async function validateToken(req: any, res: Response, next) {
  let error = new Unauthenticated();
  try {
    const token = req.headers["authorization"];

    if (!token) {
      error.setMessage("authorization header is not provided in headers");
      return next(error);
    }

    const tokenPart = token.split(" ")[1];

    if (!tokenPart) {
      error.setMessage("authorization header is not in correct format");
      return next(error);
    }

    let user = await verifyAccessToken(tokenPart);

    req.user = {
      ...user,
      token: tokenPart,
    };

    next();
  } catch (_e) {
    error.setMessage("token is invalid");
    next(error);
  }
}

export { validateId, validateBody, validateToken };
