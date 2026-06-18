import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppSettingsProvider>
      <RouterProvider router={router} />
    </AppSettingsProvider>
  </React.StrictMode>,
);

