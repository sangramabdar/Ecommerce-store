import { z } from "zod";

const orderAddressSchema = z.object({
  address: z.string({ required_error: "addesss is required" }),
  city: z.string({ required_error: "city is required" }),
  state: z.string({ required_error: "state is required" }),
  paymentMode: z.enum(["CASH", "ONLINE"], {
    required_error: "payment mode is invalid",
  }),
});

type OrderSchema = z.infer<typeof orderAddressSchema>;

export type { OrderSchema };
export { orderAddressSchema };
