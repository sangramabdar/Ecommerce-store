import { z } from "zod";

const orderAddressSchema = z.object({
  address: z.string({ required_error: "addesss is required" }),
  city: z.string({ required_error: "city is required" }),
  pincode: z.number({ required_error: "pincode is required" }),
});

type TOrderSchema = z.infer<typeof orderAddressSchema>;

export type { TOrderSchema };
export { orderAddressSchema };
