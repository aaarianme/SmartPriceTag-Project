import React from "react";
import StoreNav from "../Components/StoreNav";
import useLocalStorage from "../Hooks/useLocalStorage";
import { usePostRequest } from "../Hooks/HttpsRequest";
import { usePopUpManager, PopUpTrigger } from "../Hooks/usePopUpManager";
export default function GetItemsFromApiPage() {
  const [setPopUp, removePopUp, popUp] = usePopUpManager();
  const [getLS, setLS, removeLS] = useLocalStorage();
  return (
    <>
      <StoreNav />
      <div>
        <div>
          <div className="p-20 pt-10">
            <div className="">
              <div className="">
                <div className="">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Get Items From Your API
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Your API Needs to match the json structure below.
                  </p>
                </div>
              </div>
              <div className="mt-3 md:col-span-2 md:mt-0  border">
                <div className="overflow-hidden">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          URL
                        </label>
                        <input
                          name="first-name"
                          className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Authorization Headers
                        </label>
                        <input
                          name="first-name"
                          className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button className="inline-flex justify-center rounded-md border border-transparent bg-zinc-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Get Data
                  </button>
                </div>
              </div>
              <div className="mt-3 md:col-span-2 md:mt-0">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-sm border-2 rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base ">
                          Items Database
                        </h3>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <button
                          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          See all
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                      <thead>
                        <tr>
                          <th className="px-6   align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ItemID
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Name
                          </th>
                          <th className="px-6   align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Weight
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Net Weight
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Internal ID
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Actions
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tag
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="border-b">
                          <th className="px-6 align-middle text-xs whitespace-nowrap p-4 text-left  ">
                            /argon/
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            4,569
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            340
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                            46,53%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpTrigger popUp={popUp} />
    </>
  );
}
