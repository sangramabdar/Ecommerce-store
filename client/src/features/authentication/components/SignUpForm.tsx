import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { toast } from "react-toastify";
import { RequestStatus } from "../../../services/constants";
import {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
} from "../../../utils/toast";
import { signUpUserService } from "../services/auth";
import cn from "../../../utils/cn";

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

function SignUpForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSignUpUser = async (user: typeof initialUserInfo) => {
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
    handleSignUpUser(signUpInfo);
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
      className="flex flex-col mt-[100px] bg-white m-auto max-w-sm rounded-lg border
      "
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-center m-5 text-xl">Sign Up</h1>
      <div className="flex flex-col gap-4 justify-start px-4">
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
          className={cn(
            "bg-tertiary text-white rounded-md self-center px-4 py-2",
            isDisabled && "opacity-30"
          )}
          type="submit"
        >
          Sign Up
        </button>
      </div>

      <Link to="/login" className="m-5 text-center text-gray-600">
        have already an account ?
      </Link>
    </form>
  );
}

export default SignUpForm;
