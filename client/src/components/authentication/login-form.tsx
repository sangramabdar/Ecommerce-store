import { Link, useNavigate } from "react-router-dom";

import { startTransition, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Input from "../ui/Input";
import Button from "../ui/button";
import { loginSchema, LoginSchema } from "../../schema/auth.schema";
import { loginUserService } from "../../services/auth.service";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "./auth-provider";

function LoginForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { addUser } = useAuthContext();

  const {
    register,
    handleSubmit: handleSubmitZod,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginUser = async (loginInfo: LoginSchema) => {
    try {
      const data = await loginUserService(loginInfo);
      showSuccessToast("logged in");
      await addUser(data);

      location.replace("/");
    } catch (error) {
      showErrorToast("not registered");
      startTransition(() => {
        navigate("/login");
      });
    }

    setIsDisabled(false);
  };

  const onSubmit: SubmitHandler<LoginSchema> = data => {
    setIsDisabled(true);
    handleLoginUser(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Login
        </h2>
      </div>

      <form
        className="flex flex-col w-full sm:mx-auto sm:w-full sm:max-w-sm mt-10
      "
        onSubmit={handleSubmitZod(onSubmit)}
      >
        <div className="flex flex-col gap-4 justify-start px-4">
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
            Login
          </Button>
        </div>

        <Link to="/signup" className="m-5 text-center text-gray-600">
          don't have an account ? create an account
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
