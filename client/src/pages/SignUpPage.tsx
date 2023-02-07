import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import SignUp from "../modules/authentication/components/SignUp";

function SignUpPage() {
  return (
    <MountAndUnmountAnimation>
      <SignUp />
    </MountAndUnmountAnimation>
  );
}

export default SignUpPage;
