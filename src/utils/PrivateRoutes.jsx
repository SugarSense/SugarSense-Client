import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";

function PrivateRoutes() {
  const cookies = new Cookies();
  const loggedIn = cookies.get("auth_token");

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
