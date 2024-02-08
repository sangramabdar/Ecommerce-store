import mongoose from "mongoose";

const CouponShema = new mongoose.Schema(
  {
    discountPrice: {
      type: Number,
      required: true,
    },

    minPrice: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponShema);

export { Coupon };
