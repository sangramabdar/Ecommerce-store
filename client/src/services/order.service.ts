import { BASE_URL } from "./constants";
import { getRequest } from "./requests";

const ORDERS_URL = BASE_URL + "/orders";

async function getOrdersService(headers: {} = {}) {
  const result = await getRequest(ORDERS_URL, {
    ...headers,
  });
  return result;
}

export { getOrdersService };
