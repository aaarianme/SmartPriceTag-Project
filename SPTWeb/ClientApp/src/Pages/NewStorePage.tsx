//#region
import React, { useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import {
  ErrorPopUp,
  FullPageLoaderPopUp,
  MessagePopUp,
  PopUpTrigger,
  usePopUpManager,
} from "../Hooks/usePopUpManager";
import { IClient, IStore } from "../Helpers/Interfaces";
import { usePostRequest } from "../Hooks/HttpsRequest";
import useLocalStorage from "../Hooks/useLocalStorage";
//#endregion
export default function NewStorePage() {
  const [setPopUp, removePopUp, popUp] = usePopUpManager();
  const postReq = usePostRequest();
  const [getLS, setLS, removeLS] = useLocalStorage();
  const [state, setState] = useState<{
    name: string;
    address: string;
    pin: string;
    branchNumber: string;
  }>({
    name: "",
    address: "",
    pin: "0000",
    branchNumber: "",
  });

  function checkInputs(): string | null {
    if (state.name == null || state.name == "")
      return "Store Name Msut Be Provided";
    if (state.branchNumber == null) return "Branch Number Msut Be Provided";
    if (state.pin == null) return "PINMsut Be Provided";
    if (state.pin.length != 4) return "PIN Msut Be 4 DIGITS";
    if (!/^\d+$/.test(state.pin)) return "PIN can only be made of numbers";

    return null;
  }
  var errors = checkInputs();

  async function handleSubmit() {
    if (errors != null) return;
    setPopUp(<FullPageLoaderPopUp loadingText="Adding a new store..." />);
    await postReq("/api/client/stores/new", state, {
      onSuccess: () => {
        setPopUp(
          <MessagePopUp
            onButtonClick={removePopUp}
            buttonText="Okay"
            header="New Store Added!"
            message="Your new store was added."
          />
        );
      },
      onFail: (res) => {
        setPopUp(
          <ErrorPopUp
            onButtonClick={removePopUp}
            buttonText="Okay"
            header="Something went wrong"
            message={
              res.data?.message ?? "Your new store was not added to our records"
            }
          />
        );
      },
    });
  }

  return (
    <div>
      <UserNavbar></UserNavbar>
      <div>
        <div className="p-20 pt-10">
          <div className="">
            <div className="">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  New Store Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  You will pick a 4-digit PIN for this store. PINs cannot be
                  changed later.
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
                        Store Name (REQUIRED)
                      </label>
                      <input
                        value={state.name}
                        onChange={(e) =>
                          setState({ ...state, name: e.target.value })
                        }
                        name="first-name"
                        className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address (Optional)
                      </label>
                      <input
                        value={state.address}
                        onChange={(e) =>
                          setState({ ...state, address: e.target.value })
                        }
                        name="first-name"
                        className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch Number (REQUIRED)
                      </label>
                      <input
                        value={state.branchNumber}
                        onChange={(e) =>
                          setState({
                            ...state,
                            branchNumber: e.target.value,
                          })
                        }
                        className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4">
                      <div className="col-span-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          PIN (REQUIRED | 4 DIGITS)
                        </label>
                        <div className="flex flex-row gap-5">
                          <input
                            className="mt-1 inline-block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={state.pin}
                            onChange={(e) =>
                              setState({ ...state, pin: e.target.value })
                            }
                          />
                          {errors == null ? (
                            <div className="w-100 border-l-2 border-l-blue-600 bg-blue-50 rounded px-2">
                              <label>
                                Store Login Name:{" "}
                                <span className="font-semibold">
                                  {getLS<IClient>("userInfo").clientId}_
                                  {state.branchNumber}
                                </span>
                              </label>
                              <label className="block">
                                Store Login PIN:{" "}
                                <span className="font-semibold">
                                  {state.pin}
                                </span>
                              </label>
                            </div>
                          ) : (
                            <div className="w-100 border-l-2 border-l-red-600 bg-red-50 rounded px-2">
                              <label>
                                <span className="font-semibold">
                                  Before You Submit...
                                </span>
                              </label>
                              <label className="block">{errors}</label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <a
                    href="/u/stores"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    View All Stores
                  </a>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Creat New Store Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpTrigger popUp={popUp}></PopUpTrigger>
    </div>
  );
}
