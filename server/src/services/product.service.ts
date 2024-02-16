import { Request } from "express";
import { getProductById, getProducts } from "../repositories";
import { NotFound } from "../utils/exceptions";

async function getProductsService(req: Request) {
  try {
    const products = await getProducts();

    if (!products) {
      throw new NotFound("products");
    }

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductService(req: Request) {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
      throw new NotFound("product");
    }

    return product;
  } catch (error) {
    throw error;
  }
}

export { getProductService, getProductsService };
