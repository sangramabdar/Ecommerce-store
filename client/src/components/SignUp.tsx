import NavBar from "./NavBar";
import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../utils/toast";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { postRequest } from "../api/requests";
import { useSelector } from "react-redux";
import { BASE_URL, DEFAULT_HEADERS, Status } from "../api/constants";
import { signUpUserService } from "../api/auth";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .email("email must be valid"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be 6 characters"),
});

const initialUserInfo = {
  email: "",
  password: "",
};

function SignUp() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector<any, any>(state => state.auth);

  useEffect(() => {
    if (!user) return;
    navigate("/");
  }, [user]);

  useEffect(() => {
    if (!error) return;
    navigate("/login");
  }, [error]);

  const signUpUser = async (user: any) => {
    const result = await signUpUserService(user);
    toast.dismiss();

    if (result.status === Status.ERROR) {
      showErrorToast("Registered already");
      setError("error");
      return;
    }

    showSuccessToast("Registered");
    setIsDisabled(false);
  };

  const handleOnSubmit = (values: any) => {
    showLoadingToast("Processing");
    setIsDisabled(true);
    signUpUser(values);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: userSchema,
      initialValues: { ...initialUserInfo },
      onSubmit: handleOnSubmit,
      enableReinitialize: true,
    });

  return (
    <NavBar>
      <form
        className="flex flex-col justify-center items-center mt-[100px] bg-white m-auto w-[300px] rounded-lg
      "
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold m-5">Sign up</h1>
        <InputField
          name="email"
          error={errors.email}
          touched={touched.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Email"
          type="text"
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
          disabled={isDisabled}
          className="w-20 h-10 bg-violet-600 text-white rounded-md"
          type="submit"
        >
          Submit
        </button>
        <Link to="/login" className="m-5">
          have already an account ?
        </Link>
      </form>
    </NavBar>
  );
}

export default SignUp;
