import React from "react";

import "./custom.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import HomePage from "./Pages/HomePage";
//-------------------
import PageNotFound from "./Pages/PageNotFound";
//-------------------
import DashboardPage from "./Pages/DashboardPage";
//-------------------
import LoginOutlet from "./Pages/LoginOutlet";
import LoginPage from "./Pages/LoginPage";
import ClientLoginPage from "./Pages/ClientLoginPage";
import StoreLoginPage from "./Pages/StoreLoginPage";
//-------------------

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginOutlet />}>
          <Route index element={<LoginPage />} />
          <Route path="master" element={<ClientLoginPage />} />
          <Route path="store" element={<StoreLoginPage />} />
        </Route>
        <Route path="u" element={<DashboardPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
