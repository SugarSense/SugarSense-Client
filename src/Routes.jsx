import { Routes, Route, BrowserRouter } from "react-router-dom";
import DataGraphics from "./views/DataGraphics";
import Home from "./views/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./views/Login";
import Register from "./views/Register";
import Connexions from "./views/Connexions";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/data-graphics" element={<DataGraphics />} />
          <Route path="/connexions" element={<Connexions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
