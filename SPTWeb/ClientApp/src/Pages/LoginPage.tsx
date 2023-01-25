import React from "react";
import {
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

export default function LoginPage() {
  return (
    <div>
      <div className="flex h-screen pb-40">
        <div className="m-auto">
          <div className="flex space-x-5 flex-row">
            <div className="max-w-sm p-6  border border-gray-200 rounded-lg shadow-md ">
              <BuildingLibraryIcon className="text-gray-300 w-16 h-16"></BuildingLibraryIcon>

              <p className="my-3 font-normal text-gray-500 dark:text-gray-400">
                Login as Master to make changes to your account, add a branch
                and see data accross all branches.
              </p>
              <div className="flex flex-row justify-end">
                <a
                  href="/"
                  className="justify-end text-blue-600 px-2 py-1 bg-white rounded inline-block hover:underline"
                >
                  Master Login
                </a>
              </div>
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <BuildingStorefrontIcon className="text-gray-300 w-16 h-16" />

              <p className="my-3 font-normal text-gray-500 dark:text-gray-400">
                Login as Store Account to manage Tags, view store data and
                change store settings. Sign in as Master to make changes to all
                branches.
              </p>
              <div className="flex flex-row justify-end">
                <a
                  href="/"
                  className="justify-end text-blue-600 px-2 py-1 bg-white rounded inline-block hover:underline"
                >
                  Store Login
                </a>
              </div>
            </div>
            <div className="max-w-sm p-6 bg-green-600 border rounded-lg text-white">
              <UserPlusIcon className="w-16 h-16" />

              <p className="my-3 font-normal">
                Create a new account. You will be able to add branches, manage
                new Tags and more. Your new account will be the Master.
              </p>
              <div className="flex flex-row justify-end">
                <a
                  href="/"
                  className="justify-end text-green-600 px-2 py-1 bg-white rounded inline-block hover:underline"
                >
                  Sign Up Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
