import { BASE_URL } from "../../services/constants";
import { getRequest } from "../../services/requests";

const ORDERS_URL = BASE_URL + "/orders";

async function getOrdersService(headers: {} = {}) {
  const result = await getRequest(ORDERS_URL, {
    ...headers,
  });
  return result;
}

export { getOrdersService };
