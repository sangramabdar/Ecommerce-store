import { BASE_URL, RequestStatus } from "./constants";
import { getRequest, putRequest } from "./requests";

const PROFILE_URL = BASE_URL + "/profile";

async function getProfileService() {
  const result = await getRequest(PROFILE_URL);

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

async function updateProfileService(data: any) {
  const result = await putRequest(PROFILE_URL, data);

  if (result.status === RequestStatus.ERROR) throw result;

  return result.data;
}

export { getProfileService, updateProfileService };
