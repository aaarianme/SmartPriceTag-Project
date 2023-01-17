import React from "react";
import { Outlet } from "react-router-dom";

export default function LoginOutlet() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
