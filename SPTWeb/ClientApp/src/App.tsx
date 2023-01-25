import React from "react";

import "./custom.css";
import "./Assets/Fonts/headerFont.ttf";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  ProtectedRoute,
  ProtectedRoteAcceessMode,
} from "./Components/ProtectedRoute";

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
import ClientDashboardOutlet from "./Pages/ClientDashboardOutlet";
import ClientStoresPage from "./Pages/ClientStoresPage";
import NewStorePage from "./Pages/NewStorePage";
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
        <Route
          path="u"
          element={
            <ProtectedRoute accessFor={ProtectedRoteAcceessMode.masterOnly}>
              <ClientDashboardOutlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="stores" element={<ClientStoresPage />} />
          <Route path="stores/new" element={<NewStorePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
