import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthSliceType, addUser } from "../store/authSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/toast";
import { RequestStatus } from "../../../services/constants";
import { loginUserService } from "../services/auth";
import { RootState } from "../../../store/store";

const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup.string().required("Required"),
});

const initialLoginInfo = {
  email: "",
  password: "",
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = useSelector<RootState, AuthSliceType>(state => state.auth.user);
  const [loginInfo, setLoginInfo] = useState<typeof initialLoginInfo | null>(
    null
  );

  useEffect(() => {
    if (!user) return;
    navigate("/");
  }, [user]);

  useEffect(() => {
    if (!loggedIn) return;
    navigate("/");
  }, [loggedIn]);

  useEffect(() => {
    if (!loginInfo) return;

    loginUser(loginInfo);
  }, [loginInfo]);

  const loginUser = async (user: any) => {
    const result = await loginUserService(user);
    toast.dismiss();

    if (result.status === RequestStatus.ERROR) {
      showErrorToast("Invalid email or password");
    } else {
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(addUser(result.data));
      showSuccessToast("Logged In");
      setLoggedIn(true);
    }
    setIsDisabled(false);
  };

  const handleOnSubmit = (loginInfo: any) => {
    setIsDisabled(true);
    showLoadingToast("Processing");
    setLoginInfo(loginInfo);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: loginSchema,
      initialValues: initialLoginInfo,
      onSubmit: handleOnSubmit,
    });

  return (
    <form
      className="flex flex-col justify-center items-center mt-[100px] bg-white m-auto w-[300px] rounded-lg
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
        type="email"
      />
      <InputField
        name="password"
        error={errors.password}
        touched={touched.password}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Password"
        type="password"
      />
      <button
        className="w-20 h-10 bg-violet-600 text-white rounded-md"
        type="submit"
        disabled={isDisabled}
      >
        Submit
      </button>
      <Link to="/signup" className="m-5">
        Don't have an account ?
      </Link>
    </form>
  );
}

export default Login;
