import { BASE_URL, DEFAULT_HEADERS } from "../../../services/constants";
import { postRequest } from "../../../services/requests";

async function loginUserService(user: any) {
  const LOGIN_URL = BASE_URL + "/auth/login";
  const result = await postRequest(LOGIN_URL, user);
  return result;
}

async function signUpUserService(user: any) {
  const SIGNUP_URL = BASE_URL + "/auth/signup";
  const result = await postRequest(SIGNUP_URL, user);
  return result;
}

export { loginUserService, signUpUserService };
