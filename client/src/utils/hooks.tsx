import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/signedInUser";

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
}

export { useAuthentication };
