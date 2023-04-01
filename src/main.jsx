import {SnackbarProvider} from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <SnackbarProvider autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  // </React.StrictMode>
);
