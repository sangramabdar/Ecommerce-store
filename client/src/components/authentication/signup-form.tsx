import { Link, useNavigate } from "react-router-dom";

import { startTransition, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Input from "../ui/input";
import Button from "../ui/button";
import { SignUpSchema, signUpSchema } from "../../schema/auth.schema";
import { signUpUserService } from "../../services/auth.service";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUpForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: handleSubmitZod,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUpUser = async (signUpInfo: SignUpSchema) => {
    try {
      await signUpUserService(signUpInfo);
      showSuccessToast("Invalid email or password");
      setIsDisabled(false);
    } catch (error) {
      showErrorToast("registered already");
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  const onSubmit: SubmitHandler<SignUpSchema> = data => {
    setIsDisabled(true);
    handleSignUpUser(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-primary">
          Sign up
        </h2>
      </div>

      <form
        className="flex flex-col w-full sm:mx-auto sm:w-full sm:max-w-sm mt-10
      "
        onSubmit={handleSubmitZod(onSubmit)}
      >
        <div className="flex flex-col gap-4 justify-start px-4">
          <Input
            error={errors.firstName?.message}
            label="First Name"
            type="text"
            {...register("firstName")}
          />
          <Input
            error={errors.lastName?.message}
            label="Last Name"
            type="text"
            {...register("lastName")}
          />
          <Input
            error={errors.email?.message}
            label="Email"
            type="text"
            {...register("email")}
          />
          <Input
            error={errors.password?.message}
            label="Password"
            type="password"
            {...register("password")}
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
