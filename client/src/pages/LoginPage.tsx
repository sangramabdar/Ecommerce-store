import React from "react";
import NavBar from "../components/NavBar";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import Login from "../modules/auth/components/Login";

function LoginPage() {
  return (
    <MountAndUnmountAnimation>
      <Login />
    </MountAndUnmountAnimation>
  );
}

export default LoginPage;
