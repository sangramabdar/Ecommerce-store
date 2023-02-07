import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import Login from "../modules/authentication/components/Login";

function LoginPage() {
  return (
    <MountAndUnmountAnimation>
      <Login />
    </MountAndUnmountAnimation>
  );
}

export default LoginPage;
