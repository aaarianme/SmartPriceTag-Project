import React, { useEffect, useState } from "react";
import { useGetRequest } from "../Hooks/HttpsRequest";
import {
  PopUpTrigger,
  usePopUpManager,
  MessagePopUp,
} from "../Hooks/usePopUpManager";
export default function ClientLoginPage() {
  const [loaded, result, makeGetRequest] = useGetRequest();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [setNewPopUp, removePopUp, popUp] = usePopUpManager();

  var handleLogin = async () => {
    await makeGetRequest("/api/auth/client", {
      Username: username,
      Password: password,
    });
    setNewPopUp(
      <MessagePopUp
        header="hi"
        message="asas"
        onButtonClick={() => {}}
      ></MessagePopUp>
    );
  };
  useEffect(() => {
    console.log(loaded, result);
  }, [loaded, result]);

  return (
    <div className="mx-60 mt-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
            Logging in as Master. Not you?{" "}
            <a href="/login">Go back to login page</a>
          </p>
          <button
            onClick={() => handleLogin()}
            className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>
      <PopUpTrigger popUp={popUp}></PopUpTrigger>
    </div>
  );
}
//ajax
