import { BASE_URL, RequestStatus } from "./constants";
import { getRequest, postRequest } from "./requests";

const ORDERS_URL = BASE_URL + "/orders";

async function getOrdersService() {
  const result = await getRequest(ORDERS_URL);

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

const placeOrderService = async (data: any) => {
  const result = await postRequest(BASE_URL + "/orders", data);

  if (result.status === RequestStatus.ERROR) throw result;

  return result;
};

export { getOrdersService, placeOrderService };
