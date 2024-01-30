import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../modules/authentication/store/authSlice";
import { getRequest } from "../services/requests";
import { BASE_URL, RequestStatus } from "../services/constants";

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

      dispatch(addUser(user));
    }

    setTimeout(() => {
      verifyUser();
    }, 2000);
  }, []);
}

export default useAuthentication;
