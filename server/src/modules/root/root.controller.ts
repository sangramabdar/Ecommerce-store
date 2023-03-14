import { Request, Response } from "express";
import path from "path";

class RootController {
  static async get(req: Request, res: Response) {
    res.sendFile(
      path.join(__dirname, "..", "..", "..", "..", "client", "dist")
    );
  }
}

export default RootController;
