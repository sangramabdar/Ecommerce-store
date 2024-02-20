import { Product } from "../models";

async function getProducts() {
  const products = await Product.find();

  if (!products) return null;

  return products;
}

async function getProductById(id: string) {
  const product = await Product.findOne({
    _id: id,
  });

  if (!product) return null;

  return product;
}

export { getProducts, getProductById };
