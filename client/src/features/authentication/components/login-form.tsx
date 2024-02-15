import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUserThunk } from "../auth.slice";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/button";
import { LoginSchema, loginSchema } from "../auth.schema";

const initialLoginInfo = {
  email: "",
  password: "",
};

export function LoginForm() {
  const dispatch = useDispatch<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = (loginInfo: LoginSchema) => {
    setIsDisabled(true);
    handleLoginUser(loginInfo);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik<any>({
      validationSchema: loginSchema,
      initialValues: initialLoginInfo,
      onSubmit: handleOnSubmit,
    });

  const handleLoginUser = async (loginInfo: LoginSchema) => {
    try {
      const result = await dispatch(loginUserThunk(loginInfo));

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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Login
        </h2>
      </div>

      <form
        className="flex flex-col w-full sm:mx-auto sm:w-full sm:max-w-sm mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 justify-start">
          <Input
            name="email"
            error={errors.email as string}
            touched={touched.email as boolean}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            type="text"
          />
          <Input
            name="password"
            error={errors.password as string}
            touched={touched.password as boolean}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            type="password"
          />
          <Button disabled={isDisabled} type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <div className="m-5">
        <span> don't have an account ? </span>
        <Link to="/signup" className="text-center text-gray-600">
          create an account
        </Link>
      </div>
    </div>
  );
}
