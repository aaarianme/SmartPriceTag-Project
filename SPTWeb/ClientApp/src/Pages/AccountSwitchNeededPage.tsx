import React from "react";
import { ProtectedRoteAcceessError } from "../Components/ProtectedRoute";
import LoginPage from "./LoginPage";
export default function AccountSwitchNeededPage(props: {
  error: ProtectedRoteAcceessError;
}) {
  return props.error == ProtectedRoteAcceessError.loginNotFound ? (
    <div>
      <div className="w-auto m-4 bg-red-300 border-rose-400 border-4 border-solid p-2 text-rose-800 rounded-sm">
        The resource you are trying to access is protected. Login first.
      </div>
      <LoginPage></LoginPage>
    </div>
  ) : (
    <div className="flex h-screen pb-40">
      <div className="m-auto">
        <div className="max-w-sm p-6 text-xl bg-white border border-gray-200 rounded-lg shadow-md">
          <p className="my-3 font-normal text-gray-500 dark:text-gray-400">
            Your requested resource cannot be accessed.
            {props.error == ProtectedRoteAcceessError.switchToStoreView ? (
              <label>
                You are signed in as Master and this resource is store specefic.
                Go to <a href="/u/stores/view">Store View</a> and select a store
                to see its resources
              </label>
            ) : (
              <label>
                You are signed in as Store and do not have the authority to view
                this resource. Go to <a href="/login">Login</a> and sign in as
                Master to be able to see this page.
              </label>
            )}
          </p>
          <div className="flex flex-row justify-end"></div>
        </div>
      </div>
    </div>
  );
}
