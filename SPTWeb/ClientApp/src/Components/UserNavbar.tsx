import React from "react";

export default function UserNavbar() {
  return (
    <div>
      <header>
        <nav className="shadow">
          <div className="flex justify-between items-center py-6 px-10 container mx-auto">
            <div>
              <h1 className="text-2xl font-semibold border-solid border-1 border-yellow-500 text-yellow-500 p-1 rounded-md hover:cursor-pointer">
                Smart Price Tag System
              </h1>
            </div>

            <div>
              <div className="flex items-center">
                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                  <h1 className="text-text-gray-600  py-2 hover:cursor-pointer hover:text-indigo-600">
                    aaa
                  </h1>
                  <h1 className="text-text-gray-600  py-2 hover:cursor-pointer px-4 rounded text-white bg-gray-600 hover:shadow-lg">
                    bbb
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
