import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./Contact";

const router = createBrowserRouter([
  {
    path: "/Nimble-tz",
    element: <App />,
  },
  {
    path: "/contact/:id",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={setupStore()}>
    <RouterProvider router={router} />
  </Provider>
);
