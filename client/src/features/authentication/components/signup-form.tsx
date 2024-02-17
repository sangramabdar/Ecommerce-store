import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { startTransition, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/button";
import { SignUpSchema, signUpSchema } from "../auth.schema";
import { signUpUserService } from "../auth.service";

const initialUserInfo = {
  email: "",
  password: "",
};

function SignUpForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSignUpUser = async (signUpInfo: SignUpSchema) => {
    try {
      await signUpUserService(signUpInfo);
      showSuccessToast("Registered");
      setIsDisabled(false);
    } catch (error) {
      showErrorToast("registered already");
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  const handleOnSubmit = (signUpInfo: SignUpSchema) => {
    setIsDisabled(true);
    handleSignUpUser(signUpInfo);
  };

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    useFormik<any>({
      validationSchema: signUpSchema,
      initialValues: { ...initialUserInfo },
      onSubmit: handleOnSubmit,
      enableReinitialize: true,
    });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Sign up
        </h2>
      </div>

      <form
        className="flex flex-col w-full sm:mx-auto sm:w-full sm:max-w-sm mt-10
      "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 justify-start px-4">
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
            Sign Up
          </Button>
        </div>

        <Link to="/login" className="m-5 text-center text-gray-600">
          have already an account ?
        </Link>
      </form>
    </div>
  );
}

export default SignUpForm;
