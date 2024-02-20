import React, { useContext, useEffect, useState } from "react";
import Skeleton from "./ui/skeleton";
import { BASE_URL, RequestStatus } from "../services/constants";
import { getRequest } from "../services/requests";

const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  removeUser: () => {},
  addUser: (user: any) => {},
});

function Auth({ children }: { children: React.ReactNode }) {
  const [value, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    isAuthenticating: true,
    removeUser: () => {},
    addUser: (user: any) => {},
  });

  const removeUser = () => {
    setAuth(prev => {
      return {
        ...prev,
        isAuthenticated: false,
        user: null,
        isAuthenticating: false,
      };
    });
  };

  const addUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setAuth(prev => {
      return {
        ...prev,
        isAuthenticated: false,
        user,
        isAuthenticating: false,
      };
    });
  };

  const contextValue = {
    ...value,
    addUser,
    removeUser,
  };

  useEffect(() => {
    async function verifyUser() {
      const localUser = localStorage.getItem("user") as null;

      const user: any = JSON.parse(localUser ? localUser : "{}");

      const result = await getRequest(BASE_URL + "/auth/verify", {
        Authorization: `Bearer ${user?.accessToken}`,
      });

      if (result.status === RequestStatus.ERROR) {
        removeUser();
        return;
      }

      setAuth(prev => {
        return {
          ...prev,
          isAuthenticated: true,
          user: result.data,
          isAuthenticating: false,
        };
      });
    }

    verifyUser();
  }, []);

  if (value.isAuthenticating)
    return (
      <div className="h-screen">
        <Skeleton className="h-full bg-gray-300" />
      </div>
    );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export default Auth;
export { useAuthContext };
