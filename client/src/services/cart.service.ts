import { BASE_URL, RequestStatus } from "./constants";
import { getRequest, postRequest } from "./requests";

const CART_URL = BASE_URL + "/carts";

async function getCartItemsService() {
  const result = await getRequest(CART_URL);

  if (result.status === RequestStatus.ERROR) throw result.error;

  return result.data;
}

async function addProductTocartSerivce(data: {}) {
  const result = await postRequest(CART_URL, data);

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

export { getCartItemsService, addProductTocartSerivce };
