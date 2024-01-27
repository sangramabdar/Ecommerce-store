// import mongoose from "mongoose";

// const productSChema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: Object,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("products", productSChema);

// mongoose
//   .connect(
//     "mongodb+srv://sangram:f8I7xlHCIl8nzO2X@cluster0.epnjwrb.mongodb.net/ecommerce-store?retryWrites=true&w=majority",
//     {}
//   )
//   .then(async con => {
//     const products = await Product.find();
//     console.log(products);
//   });
