import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AuthSliceType,
  addUser,
} from "../modules/authentication/store/authSlice";
import { RootState } from "../store/store";

function useAuthentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector<RootState, AuthSliceType>(state => state.auth.user);

  useEffect(() => {
    if (user) return;

    if (!localStorage.getItem("user")) {
      navigate("/");
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("user")!!);
    dispatch(addUser(authUser));
  }, []);

  return user;
}

export default useAuthentication;
