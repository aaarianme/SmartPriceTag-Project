import React, { useState } from "react";
import StoreNav from "../Components/StoreNav";
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import LoaderAnimator from "../Components/LoaderAnimator";

interface IPageState {
  loaded: boolean;
  items?: any;
}
export default function StoreItemsPage() {
  const [state, setState] = useState<IPageState>({ loaded: true });

  return (
    <div className="flex flex-row">
      <aside className="sticky inline-block text-zinc-50 top-0 left-0 z-40 h-auto p-3">
        <div className="bg-zinc-800 sticky top-10 z-50 rounded-lg">
          <div className="h-full px-3 py-4 overflow-y-auto ">
            <ul className="space-y-2 text-zinc-50">
              <li>
                <input
                  className="block w-full p-2 border rounded-md text-zinc-50 pl-10 text-sm bg-transparent ring-0 border-zinc-700 focus:border-transparent focus:ring-0"
                  placeholder="Search..."
                />
              </li>
              <li>
                <p className="flex items-center p-2 text-base font-normal rounded-lg cursor-default">
                  <ClipboardDocumentCheckIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Items Count
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-zinc-800 bg-blue-100 rounded-full">
                    3
                  </span>
                </p>
              </li>
              <li>
                <a
                  href="/s/items/new"
                  className="flex items-center p-2 text-base font-normal text-zinc-400 hover:text-zinc-50 rounded-lg "
                >
                  <PlusIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">Add New</span>
                </a>
              </li>
              <li>
                <a
                  href="/s/items/new/Fromapi"
                  className="flex items-center p-2 text-base font-normal text-zinc-400 hover:text-zinc-50 rounded-lg "
                >
                  <PaperAirplaneIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Fetch From API
                  </span>
                </a>
              </li>
            </ul>
            <div className="bg-orange-100 text-orange-800 rounded-md mt-2 p-2 text-sm font-thin">
              <p>- Pinned Items</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="p-4 border-l-2 border-gray-200 border-dashed w-full grow dark:border-gray-700">
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {state.loaded ? (
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
            ) : (
              <div className="text-center">
                <LoaderAnimator text="Loading All Items"></LoaderAnimator>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
