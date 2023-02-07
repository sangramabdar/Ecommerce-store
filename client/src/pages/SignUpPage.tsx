import React from "react";
import NavBar from "../components/NavBar";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import SignUp from "../modules/auth/components/SignUp";

function SignUpPage() {
  return (
    <MountAndUnmountAnimation>
      <SignUp />
    </MountAndUnmountAnimation>
  );
}

export default SignUpPage;
