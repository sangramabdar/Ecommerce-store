import { BASE_URL } from "../../../services/constants";
import { getRequest, postRequest } from "../../../services/requests";

const CART_URL = BASE_URL + "/carts";

async function getCartItemsService(headers: {} = {}) {
  const result = await getRequest(CART_URL, {
    ...headers,
  });
  return result;
}

async function addProductTocartSerivce(data: {}, headers: {} = {}) {
  const result = await postRequest(CART_URL, data, { ...headers });
  return result;
}

export { getCartItemsService, addProductTocartSerivce };
