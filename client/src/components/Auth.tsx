import { useSelector } from "react-redux";
import useAuthentication from "../hooks/use-authentication";
import React from "react";
import Skeleton from "./ui/skeleton";

function Auth({ children }: React.PropsWithChildren<{}>) {
  useAuthentication();

  const { isAuthenticating } = useSelector<any, any>(state => state.auth);

  if (isAuthenticating)
    return (
      <div className="h-screen">
        <Skeleton className="h-full bg-gray-300" />
      </div>
    );

  return children;
}

export default Auth;
