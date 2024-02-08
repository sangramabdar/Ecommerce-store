import * as yup from "yup";
import { LoginForm } from "./LoginForm.1";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("email must be valid"),
  password: yup.string().required("Required"),
});

export const initialLoginInfo = {
  email: "",
  password: "",
};

export default LoginForm;
