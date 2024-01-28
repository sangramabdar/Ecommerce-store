import mongoose from "mongoose";
import { z } from "zod";

const cartItemSchema = z.object({
  productId: z
    .string({
      required_error: "productId is required",
    })
    .refine(
      productId => {
        return mongoose.Types.ObjectId.isValid(productId);
      },
      {
        message: "productId is invalid",
      }
    ),
  quantity: z.number({
    required_error: "quantity is required",
  }),
});

type TCartSchema = z.infer<typeof cartItemSchema>;

export { cartItemSchema };
export type { TCartSchema };
