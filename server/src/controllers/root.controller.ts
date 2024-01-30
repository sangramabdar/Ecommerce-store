import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseBodyBuilder from "../utils/responseBodyBuilder";

class RootController {
  static async get(req: Request, res: Response) {
    const responseBody = new ResponseBodyBuilder();

    res.statusCode = StatusCodes.OK;
    res.json(responseBody);
  }
}

export { RootController };
