import { Product } from "../models";

async function getProducts() {
  const products = await Product.find();
  return products;
}

async function getProductById(id: string) {
  const product = await Product.findOne({
    _id: id,
  });

  console.log(product);

  if (!product) return null;

  return product;
}

export { getProducts, getProductById };
