import React, { useEffect, useState } from "react";
import { useGetRequest } from "../Hooks/HttpsRequest";
import { useNavigate } from "react-router-dom";
import {
  PopUpTrigger,
  usePopUpManager,
  MessagePopUp,
  ErrorPopUp,
} from "../Hooks/usePopUpManager";
import {
  UserCircleIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import useLocalStorage from "../Hooks/useLocalStorage";

export default function ClientLoginPage() {
  const [loaded, result, makeGetRequest] = useGetRequest();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [setNewPopUp, removePopUp, popUp] = usePopUpManager();
  const [getLS, setLS, removeLS] = useLocalStorage();
  async function HandleLogin() {
    var onLoginOk = (res) => {
      var { user } = res.data;
      setLS("userInfo", user);
      setLS("userType", "master");
      navigate("/u");
    };
    var onLoginFail = () => {
      setNewPopUp(
        <ErrorPopUp
          header="That doesn't look right"
          message="Username and/or password did not match our records. Please try again."
          buttonText="Ok"
          onButtonClick={removePopUp}
        ></ErrorPopUp>
      );
    };
    await makeGetRequest(
      "/api/auth/client",
      {
        Username: username,
        Password: password,
      },
      {
        onSuccess: onLoginOk,
        onFail: onLoginFail,
      }
    );
  }

  return (
    <div className="">
      <div className="bg-rose-200 h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
          <div className="bg-rose-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 md:p-8">
            <UserCircleIcon className="text-white w-16 h-16"></UserCircleIcon>
          </div>
          <div className="p-12 md:p-24">
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Username"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
              </svg>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Password"
              />
            </div>
            <button
              onClick={() => HandleLogin()}
              className="bg-gray-700 font-medium p-2 md:p-4 text-white text-lg w-full"
            >
              Login
            </button>
            <p className="p-2 mt-2 text-gray-500 text-xs">
              Logging In As Master. Not you?{" "}
              <a href="/login/store">Login As Store</a> or go to{" "}
              <a href="/">Home Page</a>
            </p>
          </div>
        </div>
      </div>
      <PopUpTrigger popUp={popUp}></PopUpTrigger>
    </div>
  );
}
