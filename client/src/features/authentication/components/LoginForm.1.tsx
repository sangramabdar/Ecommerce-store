import { useFormik } from "formik";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUserThunk } from "../store/authSlice";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
} from "../../../utils/toast";
import cn from "../../../utils/cn";
import { loginSchema, initialLoginInfo } from "./LoginForm";

export function LoginForm() {
  const dispatch = useDispatch<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleLoginUser = async (user: any) => {
    try {
      const result = await dispatch(loginUserThunk(user));

      localStorage.setItem("user", JSON.stringify(result.data));

      await dispatch(addUser(result.data));

      showSuccessToast("Logged In");
      setIsDisabled(false);
      navigate("/");
    } catch (error) {
      showErrorToast("Invalid email or password");
      setIsDisabled(false);
      return;
    }
  };

  const handleOnSubmit = (loginInfo: any) => {
    setIsDisabled(true);
    showLoadingToast("Processing");
    handleLoginUser(loginInfo);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: loginSchema,
      initialValues: initialLoginInfo,
      onSubmit: handleOnSubmit,
    });

  return (
    <form
      className="flex flex-col mt-[100px] bg-white m-auto max-w-sm rounded-lg border
      "
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-center m-5 text-xl">Login</h1>
      <div className="flex flex-col gap-4 justify-start px-4">
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
          className={cn(
            "bg-tertiary text-white rounded-md self-center px-4 py-2",
            isDisabled && "opacity-30"
          )}
          type="submit"
          disabled={isDisabled}
        >
          Login
        </button>
      </div>
      <Link to="/signup" className="m-5 text-center text-gray-600">
        Don't have an account ?
      </Link>
    </form>
  );
}
