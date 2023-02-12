import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/toast";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RequestStatus } from "../../../services/constants";
import { signUpUserService } from "../services/auth";
import { RootState } from "../../../store/store";
import { AuthSliceType } from "../store/authSlice";

const userSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup
    .string()
    .required("Required")
    .min(6, "password must be 8 and 20 characters"),
});

const initialUserInfo = {
  email: "",
  password: "",
};

function SignUp() {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector<RootState, AuthSliceType>(state => state.auth.user);
  const [signUpInfo, setSignUpinfo] = useState<typeof initialUserInfo | null>(
    null
  );

  useEffect(() => {
    if (!signUpInfo) return;
    signUpUser(signUpInfo);
  }, [signUpInfo]);

  useEffect(() => {
    if (!user) return;
    navigate("/");
  }, [user]);

  const signUpUser = async (user: typeof initialUserInfo) => {
    const result = await signUpUserService(user);
    toast.dismiss();

    if (result.status === RequestStatus.ERROR) {
      showErrorToast("Registered already");
      navigate("/login");
      return;
    }

    showSuccessToast("Registered");
    setIsDisabled(false);
  };

  const handleOnSubmit = (signUpInfo: typeof initialUserInfo) => {
    showLoadingToast("Processing");
    setIsDisabled(true);
    setSignUpinfo(signUpInfo);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: userSchema,
      initialValues: { ...initialUserInfo },
      onSubmit: handleOnSubmit,
      enableReinitialize: true,
    });

  return (
    <form
      className="flex flex-col justify-center items-center mt-[100px] bg-white m-auto w-[300px] rounded-lg
      "
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold m-5">Sign Up</h1>
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
  );
}

export default SignUp;
