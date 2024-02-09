import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUserThunk } from "../store/authSlice";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
} from "../../../utils/toast";
import Input from "../../../components/ui/Input";
import * as yup from "yup";
import Button from "../../../components/ui/Button";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup.string().required("Required"),
});

export const initialLoginInfo = {
  email: "",
  password: "",
};

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
      className="flex flex-col mt-[100px] bg-secondary m-auto max-w-sm rounded-lg border
      "
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-center m-5 text-xl">Login</h1>
      <div className="flex flex-col gap-4 justify-start px-4">
        <Input
          name="email"
          error={errors.email}
          touched={touched.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Email"
          type="email"
        />
        <Input
          name="password"
          error={errors.password}
          touched={touched.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Password"
          type="password"
        />
        <Button disabled={isDisabled}>Login</Button>
      </div>
      <Link to="/signup" className="m-5 text-center text-gray-600">
        Don't have an account ?
      </Link>
    </form>
  );
}
