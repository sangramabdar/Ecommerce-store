import NavBar from "./NavBar";
import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/signedInUser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../utils/toast";
import { postRequest } from "../api/requests";
import { DEFAULT_HEADERS, Status } from "../api/constants";
import { STATUS } from "../store/product";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .email("email must be valid"),
  password: yup.string().required("password is required"),
});

const initialLoginInfo = {
  email: "",
  password: "",
};

async function loginUserService(user: any) {
  const SIGNUP_URL = "http://localhost:8080/api/auth/login";
  const result = await postRequest(SIGNUP_URL, user, DEFAULT_HEADERS);
  return result;
}

function Login() {
  const { user } = useSelector<any, any>(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  // useEffect(() => {
  //   if (!user) return;
  //   navigate("/ecommerce-cart-deploy");
  // }, [user]);

  const loginUser = async (user: any) => {
    const result = await loginUserService(user);
    toast.dismiss();

    if (result.status === Status.ERROR) {
      showErrorToast("Invalid email or password");
    } else {
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(addUser(result.data));
    }

    setIsDisabled(false);
  };

  const handleOnSubmit = (values: any) => {
    setIsDisabled(true);
    showLoadingToast("Processing");

    loginUser(values);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: loginSchema,
      initialValues: initialLoginInfo,
      onSubmit: handleOnSubmit,
    });

  return (
    <NavBar>
      <form
        className="flex flex-col justify-center items-center mt-[100px] bg-red-400
      "
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold m-5">Login</h1>
        <InputField
          name="email"
          error={errors.email}
          touched={touched.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Email"
        />
        <InputField
          name="password"
          error={errors.password}
          touched={touched.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Password"
        />
        <button className="w-20 h-10" type="submit" disabled={isDisabled}>
          Submit
        </button>
        <Link to="/ecommerce-cart-deploy/signup">Don't have an account ?</Link>
      </form>
    </NavBar>
  );
}

export default Login;
