import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./custom.css";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "Dashboard",
    element: <DashboardPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
