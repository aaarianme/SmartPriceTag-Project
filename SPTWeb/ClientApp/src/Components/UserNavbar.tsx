import { TagIcon } from "@heroicons/react/24/solid";
import React from "react";
export default function UserNavbar() {
  return (
    <div>
      <header>
        <nav className="bg-gray-800">
          <div className="flex justify-between  items-center py-6 px-10 container mx-auto">
            <div className="flex items-start">
              <div className="flex h-10 w-10 items-center text-gray-400 justify-center rounded-full p-1">
                <TagIcon></TagIcon>
              </div>
              <h1 className="text-2xl font-header border-solid text-gray-300 p-1 rounded-md">
                SPT Master
              </h1>
            </div>

            <div>
              <div className="flex items-center font-header">
                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                  <a
                    href="u"
                    className="py-2 hover:cursor-pointer px-4 rounded text-white bg-gray-600 hover:shadow-lg"
                  >
                    Dashboard
                  </a>
                  <h1 className="py-2 hover:cursor-pointer px-4 rounded text-white bg-gray-600 hover:shadow-lg">
                    Sign Out
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
