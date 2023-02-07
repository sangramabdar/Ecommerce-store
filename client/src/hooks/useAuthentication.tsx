import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../modules/authentication/store/authSlice";

function useAuthentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector<any, any>(state => state.auth.user);

  useEffect(() => {
    if (user) return;

    if (!localStorage.getItem("user")) {
      navigate("/ecommerce-deploy-login");
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("user")!!);
    dispatch(addUser(authUser));
  }, []);

  return user;
}

export default useAuthentication;
