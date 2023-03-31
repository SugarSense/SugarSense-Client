import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import DataGraphics from "./views/DataGraphics";
import Home from "./views/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./views/Login";
import Register from "./views/Register";
import Cookies from "universal-cookie";
import AuthContextProvider from "./hooks/useAuth";
import FollowUp from "./views/FollowUp";
import Dashboard from "./views/Dashboard";
import Appointement from "./views/Appointement";

function RoutesProvider() {
  const cookies = new Cookies();
  const loggedIn = cookies.get("auth_token");
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/data-graphics" element={<DataGraphics />} />
            <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/appointement" element={<Appointement />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default RoutesProvider;
