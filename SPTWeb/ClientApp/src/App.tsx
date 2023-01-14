import React from "react";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import "./custom.css";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
