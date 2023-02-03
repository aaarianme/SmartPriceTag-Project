import React from "react";
import { useState, useEffect } from "react";
import { useGetRequest } from "../Hooks/HttpsRequest";
import {
  PopUpTrigger,
  usePopUpManager,
  ErrorPopUp,
} from "../Hooks/usePopUpManager";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
export default function StoreLoginPage() {
  const [loaded, result, makeGetRequest] = useGetRequest();
  const [loginName, setLoginName] = useState("");
  const [pin, setPin] = useState("");
  const [setNewPopUp, removePopUp, popUp] = usePopUpManager();
  const [getLS, setLS, removeLS] = useLocalStorage();
  const navigate = useNavigate();
  async function HandleLogin() {
    var onLoginOk = (res) => {
      var { store } = res.data;
      setLS("userInfo", store);
      setLS("userType", "store");
      navigate("/s");
    };
    var onLoginFail = (res) => {
      setNewPopUp(
        <ErrorPopUp
          header="Failed :("
          message={res.data.message ?? "Account Not Found"}
          buttonText="Ok"
          onButtonClick={removePopUp}
        ></ErrorPopUp>
      );
    };
    await makeGetRequest(
      "/api/auth/store",
      {
        loginName: loginName,
        pin: pin,
      },
      {
        onSuccess: onLoginOk,
        onFail: onLoginFail,
      }
    );
  }
  useEffect(() => {
    console.log(loaded, result);
  }, [loaded, result]);

  return (
    <div className="">
      <div className="bg-white h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-gray-700 lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded">
          <div className="p-12 md:p-24">
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Login Name"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
              </svg>
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="PIN"
              />
            </div>
            <button
              onClick={() => HandleLogin()}
              className="bg-red-700 rounded font-medium p-2 md:p-4 text-white text-lg w-full"
            >
              Login As Store
            </button>
            <p className="p-2 mt-2 text-gray-200 text-xs">
              Logging In As Store. Not you?{" "}
              <a href="/login/master">Login As Master</a> or go to{" "}
              <a href="/">Home Page</a>
            </p>
          </div>
        </div>
      </div>
      <PopUpTrigger popUp={popUp}></PopUpTrigger>
    </div>
  );
}
