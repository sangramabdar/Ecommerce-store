import { z } from "zod";

const shippinngAddressSchema = z.object({
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  pincode: z
    .string({
      required_error: "Required",
    })
    .refine(
      (value: any) => {
        console.log(value.length);
        if (!value.length) return false;

        return !isNaN(value);
      },
      {
        message: "invalid pincode",
      }
    ),
});

type ShippingAddressSchema = z.TypeOf<typeof shippinngAddressSchema>;

export { shippinngAddressSchema };
export type { ShippingAddressSchema };
