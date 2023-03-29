import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
import SideBar from "../components/navBar";

function PrivateRoutes() {
  const cookies = new Cookies();
  const loggedIn = cookies.get("auth_token");

  return loggedIn ? (
    <SideBar>
      <Outlet />
    </SideBar>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
