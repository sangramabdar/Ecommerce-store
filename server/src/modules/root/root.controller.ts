import { Request, Response } from "express";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { StatusCodes } from "http-status-codes";

class RootController {
  static async get(req: Request, res: Response) {
    const responseBody = new ResponseBodyBuilder();

    res.statusCode = StatusCodes.OK;
    res.json(responseBody);
  }
}

export default RootController;
