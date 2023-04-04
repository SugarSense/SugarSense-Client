import React, {useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
import SideBar from "../components/navBar";
import {useAuth} from "../hooks/useAuth";
import VerifyEmail from "../components/VerifyEmail";

function PrivateRoutes() {
  const cookies = new Cookies();
  const loggedIn = cookies.get("auth_token");
  const {user} = useAuth();

  return loggedIn ? (
    !user.verified ? (
      <>
        <VerifyEmail />
        <SideBar>
          <Outlet />
        </SideBar>
      </>
    ) : (
      <SideBar>
        <Outlet />
      </SideBar>
    )
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
