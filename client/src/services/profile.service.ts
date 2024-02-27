import { BASE_URL, RequestStatus } from "./constants";
import { getRequest } from "./requests";

async function getProfileService() {
  const PROFILE_URL = BASE_URL + "/profile";

  const result = await getRequest(PROFILE_URL);

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

export { getProfileService };
