import React from "react";
import { ProtectedRoteAcceessError } from "../Components/ProtectedRoute";
import LoginPage from "./LoginPage";
export default function Error403Or401Page(props: {
  error: ProtectedRoteAcceessError;
}) {
  return (
    <div className="flex bg-orange-500 h-screen">
      <div className="m-auto pb-60">
        <h1 className="text-black text-6xl font-thin">Unauthorized 403</h1>
        <h2 className="text-xl mt-2 text-red-900">Here's why this happens:</h2>
        <label className="pl-2 block text-red-900">
          - This is a Account-Specefic resource and you must switch accounts to
          view it.
        </label>
        <label className="pl-2 block text-red-900">
          - You are not authorized to view this page with the current
          credentials.
        </label>
        <label className="pl-2 block text-red-900">
          - Error Type : {props.error}
        </label>
      </div>
    </div>
  );
}
