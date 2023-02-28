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
import SignOutPage from "./Pages/SignOutPage";
import ProfilePage from "./Pages/ProfilePage";
import StoreDashboardOutlet from "./Pages/StoreDashboardOutlet";
import StoreDashboard from "./Pages/StoreDashboard";
import StoreItemsPage from "./Pages/StoreItemsPage";
import GetItemsFromApiPage from "./Pages/GetItemsFromApiPage";
import NewItemPage from "./Pages/NewItemPage";
import SampleP from "./Pages/SampleP";
import ItemViewPage from "./Pages/ItemViewPage";
import SignUpPage from "./Pages/SignUpPage";
import TagManagerPage from "./Pages/TagManagerPage";
//-------------------

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sample" element={<SampleP></SampleP>}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginOutlet />}>
          <Route index element={<LoginPage />} />
          <Route path="master" element={<ClientLoginPage />} />
          <Route path="store" element={<StoreLoginPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="u"
          element={
            <ProtectedRoute accessFor={ProtectedRoteAcceessMode.masterOnly}>
              <ClientDashboardOutlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="stores" element={<ClientStoresPage />} />
          <Route path="stores/new" element={<NewStorePage />} />
        </Route>
        <Route
          path="s"
          element={
            <ProtectedRoute accessFor={ProtectedRoteAcceessMode.storeOnly}>
              <StoreDashboardOutlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<StoreDashboard />} />
          <Route path="items" element={<StoreItemsPage />} />
          <Route path="items/:itemId" element={<ItemViewPage />} />
          <Route path="items/new" element={<NewItemPage />} />
          <Route path="items/new/fromapi" element={<GetItemsFromApiPage />} />
          <Route path="tags" element={<TagManagerPage />} />
        </Route>

        <Route path="signout" element={<SignOutPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="404" element={<PageNotFound />} />
        <Route path="pagenotfound" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
