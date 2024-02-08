import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import LoginForm from "../features/authentication/components/LoginForm";

function LoginPage() {
  return (
    <MountAndUnmountAnimation>
      <LoginForm />
    </MountAndUnmountAnimation>
  );
}

export default LoginPage;
