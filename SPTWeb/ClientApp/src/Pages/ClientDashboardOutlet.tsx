import React from "react";
import { Outlet } from "react-router-dom";
export default function ClientDashboardOutlet() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
