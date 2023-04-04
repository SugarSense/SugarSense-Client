import {useEffect} from "react";
import "./index.css";
import RoutesProvider from "./Routes";
import Cookies from "universal-cookie";
import axios from "axios";
import {useAuth} from "./hooks/useAuth";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("auth_token");

  setInterval(() => {
    (async () => {
      if (token) {
        await axios.get(`${import.meta.env.VITE_API_PATH}/dexcom/authRefresh`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("refreshed");
      }
    })();
  }, 71000000);

  return <RoutesProvider />;
}

export default App;
