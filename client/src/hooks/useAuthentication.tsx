import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRequest } from "../services/requests";
import { BASE_URL, RequestStatus } from "../services/constants";
import {
  removeUser,
  addUser,
} from "../features/authentication/store/authSlice";

function useAuthentication() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function verifyUser() {
      const localUser = localStorage.getItem("user");

      const user: any = JSON.parse(localUser ? localUser : "{}");

      const result = await getRequest(BASE_URL + "/auth/verify", {
        Authorization: `Bearer ${user?.accessToken}`,
      });

      if (result.status === RequestStatus.ERROR) {
        dispatch(removeUser());
        return;
      }

      dispatch(addUser(result.data));
    }

    verifyUser();
  }, []);
}

export default useAuthentication;
