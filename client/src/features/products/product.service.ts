import { BASE_URL } from "../../services/constants";
import { getRequest } from "../../services/requests";

const PRODUCTS_URL = BASE_URL + "/products";

async function getProductsService() {
  const result = await getRequest(PRODUCTS_URL);
  return result;
}

async function getProductService(id: string) {
  const result = await getRequest(PRODUCTS_URL + "/" + id);
  return result;
}

export { getProductsService, getProductService };
