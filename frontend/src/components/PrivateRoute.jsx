import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../Hooks/useAuthStatus";
function PrivateRoute() {
  const { loggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return <>loading</>;
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
