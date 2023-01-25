//#region
import React, { useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import { PopUpTrigger, usePopUpManager } from "../Hooks/usePopUpManager";
import { IStore } from "../Helpers/Interfaces";
//#endregion
export default function NewStorePage() {
  const [setPopUp, removePopUp, popUp] = usePopUpManager();
  const [state, setState] = useState<IStore>({} as IStore);

  function checkInputs(): string | null {
    if (state.name == null || state.name == "")
      return "Store Name Msut Be Provided";
    if (state.branchNumber == null) return "Branch Number Msut Be Provided";
    if (state.pin == null) return "PINMsut Be Provided";
    if (state.pin.length != 4) return "PIN Msut Be 4 DIGITS";
    if (state.pin) return "PIN Msut Be 4 DIGITS";

    return null;
  }
  var errors = checkInputs();

  return (
    <div>
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
              <div className="overflow-hidden shadow sm:rounded-md">
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
                        type="text"
                        name="first-name"
                        id="first-name"
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
                        type="text"
                        name="first-name"
                        id="first-name"
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
                        type="text"
                        name="first-name"
                        id="first-name"
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
                            value={state.pin}
                            type="text"
                            name="first-name"
                            id="first-name"
                            className="mt-1 inline-block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors == null ? (
                            <div className="w-100 border-l-2 border-l-blue-600 bg-blue-50 rounded px-2">
                              <label>
                                Store Login Name:{" "}
                                <span className="font-semibold">
                                  {10001}
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
                  <button
                    type="submit"
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
