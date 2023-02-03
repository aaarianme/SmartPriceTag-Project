import React from "react";
import UserNavbar from "../Components/UserNavbar";
import { IClient } from "../Helpers/Interfaces";
import useLocalStorage from "../Hooks/useLocalStorage";
export default function ProfilePage() {
  const [getLS, setLS, removeLS] = useLocalStorage();

  return (
    <div>
      <UserNavbar></UserNavbar>
      <div>
        <div className="p-20 pt-10">
          <div className="">
            <div className="">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Here's your profile.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow-sm">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UserId : {getLS<IClient>("userInfo").clientId} - Your
                        UserId cannot be changed
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
