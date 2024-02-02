import { useSelector } from "react-redux";
import useAuthentication from "../hooks/useAuthentication";
import React from "react";
import PlaceHolder from "./PlaceHolder";

function Auth({ children }: React.PropsWithChildren<{}>) {
  useAuthentication();

  const { isAuthenticating } = useSelector<any, any>(state => state.auth);

  return <>{isAuthenticating ? <PlaceHolder /> : children}</>;
}

export default Auth;
