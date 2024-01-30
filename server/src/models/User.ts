import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
    },
    orders: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export { User };
