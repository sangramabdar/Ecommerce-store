import { BASE_URL, DEFAULT_HEADERS } from "../../../services/constants";
import { postRequest } from "../../../services/requests";
import { getCartItemsService } from "../../cart/services/cart";
import { getOrdersService } from "../../order/services/order";

async function loginUserService(user: any) {
  const LOGIN_URL = BASE_URL + "/auth/login";
  const result = await postRequest(LOGIN_URL, user, DEFAULT_HEADERS);
  return result;
}

async function signUpUserService(user: any) {
  const SIGNUP_URL = BASE_URL + "/auth/signup";
  const result = await postRequest(SIGNUP_URL, user, DEFAULT_HEADERS);
  return result;
}

function loadInitialThingsService() {
  return async function (dispatch: any, getState: any) {
    dispatch(getCartItemsService());
    dispatch(getOrdersService());
  };
}

export { loginUserService, signUpUserService, loadInitialThingsService };
