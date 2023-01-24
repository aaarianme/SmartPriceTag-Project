import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import AccountSwitchNeededPage from "../Pages/AccountSwitchNeededPage";
export enum ProtectedRoteAcceessMode {
  masterOnly,
  storeOnly,
  storeOrMatser,
}
export enum ProtectedRoteAcceessError {
  non,
  loginNotFound,
  switchToStoreView,
  masterAccountOnly,
}
export function ProtectedRoute(props: {
  children: ReactElement;
  accessFor: ProtectedRoteAcceessMode;
}) {
  var user = localStorage.getItem("user");
  const navigate = useNavigate();
  var error: ProtectedRoteAcceessError = ProtectedRoteAcceessError.non;
  if (user === null || (user != "master" && user != "store"))
    error = ProtectedRoteAcceessError.loginNotFound;
  else if (
    props.accessFor == ProtectedRoteAcceessMode.masterOnly &&
    user != "master"
  )
    error = ProtectedRoteAcceessError.masterAccountOnly;
  else if (
    props.accessFor == ProtectedRoteAcceessMode.storeOnly &&
    user != "store"
  )
    error = ProtectedRoteAcceessError.switchToStoreView;

  if (error == ProtectedRoteAcceessError.non) return props.children;
  return <AccountSwitchNeededPage error={error}></AccountSwitchNeededPage>;
}
