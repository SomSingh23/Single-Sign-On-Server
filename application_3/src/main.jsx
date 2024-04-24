import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Protected from "./Protected.jsx";
import isAuthenticated from "./isAuthenticated.js";
import Logout from "./Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: isAuthenticated,
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: isAuthenticated,
  },
  {
    path: "/login",
    element: <Login />,
    loader: isAuthenticated,
  },

  {
    path: "/protected",
    element: <Protected />,
    loader: isAuthenticated,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <h1>Page Not Found 💀</h1>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
