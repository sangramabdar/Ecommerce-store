import { Request, Response } from "express";

import * as yup from "yup";
import { BadRequest } from "../../utils/exceptions";

const cartDto = yup.object().shape({
  id: yup.number().required("id is required"),
  title: yup.string().required("name is required"),
  quantity: yup.number().required("quantity is required"),
  price: yup.number().required("price is required"),
});

async function validateCartDto(req: Request, res: Response, next) {
  try {
    const cartItems = req.body.cartItems;

    if (!Array.isArray(cartItems))
      return next(new BadRequest("cartItems is required"));

    const newcartItems = [];
    let finalOrder = {};

    for (let order of cartItems) {
      finalOrder = await cartDto.validate(order, { stripUnknown: true });
      newcartItems.push(finalOrder);
    }

    req.body = newcartItems;
    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

export { validateCartDto };
