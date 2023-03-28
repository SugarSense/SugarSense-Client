import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const loggedIn = true;
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
