import mongoose from "mongoose";
import { Product } from "./src/models";

async function run() {
  const products = await (
    await fetch("https://fakestoreapi.com/products")
  ).json();

  console.log(products);

  products.map(async product => {
    delete product.id;
    await Product.create(product);
  });
}

mongoose.connect("mongodb://localhost:27017/ecommerce-store").then(() => {
  run();
});
