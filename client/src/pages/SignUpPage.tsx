import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import SignUpForm from "../features/authentication/components/SignUpForm";

function SignUpPage() {
  return (
    <MountAndUnmountAnimation>
      <SignUpForm />
    </MountAndUnmountAnimation>
  );
}

export default SignUpPage;
