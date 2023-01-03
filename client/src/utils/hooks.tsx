import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/authUser";

function useAuthentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector<any, any>(state => state.auth);

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

function useMounAndUnMount(name: string) {
  useEffect(() => {
    console.log(name + " mounted");
    return () => {
      console.log(name + " unmounted");
    };
  }, []);
}

export { useAuthentication, useMounAndUnMount };
