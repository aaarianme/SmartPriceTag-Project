import React from "react";
import {
  HomeIcon,
  ChartBarSquareIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import useLocalStorage from "../Hooks/useLocalStorage";
import { IStore } from "../Helpers/Interfaces";
export default function StoreNav() {
  const [getLS, setLS, removeLS] = useLocalStorage();
  var storeInfo = getLS<IStore>("userInfo");
  return (
    <div>
      <header>
        <nav className="bg-zinc-800 border-b-2 border-zinc-600 shadow-sm">
          <div className="flex justify-between  items-center py-1 px-10 container mx-auto">
            <div className="flex items-start">
              <div className="flex h-10 w-10 items-center text-gray-400 justify-center rounded-full p-1"></div>
              <h1 className="text-sm font-thin border-solid text-zinc-300 pt-2 rounded-md">
                {storeInfo.name} - #{storeInfo.branchNumber}
              </h1>
            </div>

            <div>
              <div className="flex items-center font-header">
                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                  <a
                    href="/s"
                    className="py-2 hover:cursor-pointer rounded text-zinc-500 hover:shadow-lg hover:text-zinc-50"
                  >
                    <HomeIcon className="w-8 h-8"></HomeIcon>
                  </a>
                  <a
                    href="/s"
                    className="py-2 hover:cursor-pointer rounded text-zinc-500 hover:shadow-lg hover:text-zinc-50"
                  >
                    <ChartBarSquareIcon className="w-8 h-8" />
                  </a>
                  <a
                    href="/s"
                    className="py-2 hover:cursor-pointer rounded text-zinc-500 hover:shadow-lg hover:text-zinc-50"
                  >
                    <BuildingStorefrontIcon className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
