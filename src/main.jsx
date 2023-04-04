import {SnackbarProvider} from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <SnackbarProvider autoHideDuration={3000}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </SnackbarProvider>
  // </React.StrictMode>
);
