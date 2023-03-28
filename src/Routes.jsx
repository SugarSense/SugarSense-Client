import { Routes, Route, BrowserRouter } from "react-router-dom";
import DataGraphics from "./views/DataGraphics";
import Home from "./views/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./views/Login";
import Register from "./views/Register";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/data-graphics" element={<DataGraphics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;