import { Request } from "express";
import { getProductById, getProducts } from "../repositories";

async function getProductsService(req: Request) {
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductService(req: Request) {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

export { getProductService, getProductsService };
