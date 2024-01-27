import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod";
import { CustomError } from "./exceptions";
import { Request, Response } from "express";

function validateSchema(schema: ZodSchema) {
  return async (req: Request, res: Response, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      error = new CustomError(error.errors[0].message, StatusCodes.BAD_REQUEST);
      next(error);
    }
  };
}

export { validateSchema };
