import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { store } from "./redux/store";
import router from "./app/router";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);