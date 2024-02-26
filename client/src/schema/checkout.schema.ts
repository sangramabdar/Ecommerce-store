import { z } from "zod";

const shippinngAddressSchema = z.object({
  address: z.string().min(1, "required"),
  state: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  // pincode: z
  //   .string({
  //     required_error: "required",
  //   })
  //   .min(1, "required")
  //   .refine(
  //     (value: any) => {
  //       if (!value.length) return false;
  //       return !isNaN(value);
  //     },
  //     {
  //       message: "invalid pincode",
  //     }
  //   ),
});

type ShippingAddressSchema = z.TypeOf<typeof shippinngAddressSchema>;

export { shippinngAddressSchema };
export type { ShippingAddressSchema };
