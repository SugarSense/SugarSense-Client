import {Toaster} from "react-hot-toast";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Cookies from "universal-cookie";
import AuthContextProvider, {AuthContext, useAuth} from "./hooks/useAuth";
import PrivateRoutes from "./utils/PrivateRoutes";
import Appointement from "./views/Appointement";
import Connexions from "./views/Connexions";
import CustomAlert from "./views/CustomAlert";
import Dashboard from "./views/Dashboard";
import DataGraphics from "./views/DataGraphics";
import DexcomStats from "./views/DexcomStats";
import Faq from "./views/Faq";
import FollowUp from "./views/FollowUp";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import TestMail from "./views/TestMail";
import UserProfile from "./views/UserProfile";
import Verify from "./views/Verify";
import {useContext, useEffect, useState} from "react";
import Appointements from "./views/Doctor/Appointements";

function RoutesProvider() {
  const cookies = new Cookies();
  const {user} = useAuth();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (cookies.get("auth_token")) {
      setRole(user.role.name);
    } else {
      setRole("");
    }
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/data-graphics" element={<DataGraphics />} />
            <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/appointement" element={<Appointement />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/connexions" element={<Connexions />} />
            <Route path="/custom-alert" element={<CustomAlert />} />
            <Route path="/testmail" element={<TestMail />} />
            <Route path="/myProfile" element={<UserProfile />} />
            <Route path="/dexcomStats" element={<DexcomStats />} />
            {role === "Doctor" && (
              <Route path="/doctor-appointement" element={<Appointements />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutesProvider;
