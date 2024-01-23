import { Request, Response } from "express";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";

class RootController {
  static async get(req: Request, res: Response) {
    const responseBody = new ResponseBodyBuilder();

    res.statusCode = 200;
    res.json(responseBody);
  }
}

export default RootController;
