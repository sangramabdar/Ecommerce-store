import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, RequestStatus } from "../../services/constants";
import { getRequest } from "../../services/requests";
import Skeleton from "../ui/skeleton";
import Loading from "../loading";

const AuthContext = React.createContext({
  isAuthenticated: false,
  isAuthenticating: true,
  removeUser: () => {},
  addUser: (user: any) => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [value, setAuth] = useState({
    isAuthenticated: false,
    isAuthenticating: true,
    removeUser: () => {},
    addUser: (user: any) => {},
  });

  const removeUser = async () => {
    localStorage.removeItem("user");
    setAuth(prev => {
      return {
        ...prev,
        isAuthenticated: false,
        isAuthenticating: false,
      };
    });
  };

  const addUser = async (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setAuth(prev => {
      return {
        ...prev,
        isAuthenticated: true,
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
      const result = await getRequest(BASE_URL + "/auth/verify");

      if (result.status === RequestStatus.ERROR) {
        await removeUser();
        return;
      }

      await addUser(result.data);
    }

    verifyUser();
  }, []);

  if (value.isAuthenticating)
    return (
      <div className="h-screen relative flex justify-center items-center">
        <Skeleton className="h-full absolute inset-0 z-[-1]" />
        <Loading className="sm:w-12 sm:h-12" />
      </div>
    );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
