import { BASE_URL, RequestStatus } from "./constants";
import { getRequest } from "./requests";

const PRODUCTS_URL = BASE_URL + "/products";

async function getProductsService() {
  const result = await getRequest(PRODUCTS_URL);

  if (result.status === RequestStatus.ERROR) throw result.error;
  return result.data;
}

async function getProductService(id: string) {
  const result = await getRequest(PRODUCTS_URL + "/" + id);

  if (result.status === RequestStatus.ERROR) throw result.error;
  return result.data;
}

export { getProductsService, getProductService };
