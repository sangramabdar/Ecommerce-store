import { BASE_URL, RequestStatus } from "../../services/constants";
import { getRequest, postRequest } from "../../services/requests";

const CART_URL = BASE_URL + "/carts";

async function getCartItemsService(headers: {} = {}) {
  const result = await getRequest(CART_URL, {
    ...headers,
  });

  if (result.status === RequestStatus.ERROR) throw result.error;

  return result.data;
}

async function addProductTocartSerivce(data: {}, headers: {} = {}) {
  const result = await postRequest(CART_URL, data, { ...headers });

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

export { getCartItemsService, addProductTocartSerivce };
