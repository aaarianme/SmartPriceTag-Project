import React from "react";

export default function UserMenu() {
  return (
    <div>
      <main>
        <section>
          <div className="bg-gray-100 sm:grid grid-cols-5 grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
            <div className="h-96 col-span-4 bg-gradient-to-tr from-green-500 to-blue-400 rounded-md flex items-center">
              <div className="ml-20 w-100">
                <h2 className="text-white text-4xl">Central Hub Connected!</h2>
                <p className="text-white mt-4 capitalize font-thin tracking-wider leading-7">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                  dolore?
                </p>

                <a
                  href="/"
                  className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
                >
                  button
                </a>
              </div>
            </div>
            <div className="h-96 col-span-1 ">
              <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
                <p>username here</p>
              </div>
              <div className="bg-white  rounded-md">
                <h1 className="text-center text-xl mt-4  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">
                  Services
                </h1>
                <div className="bg-white rounded-md list-none  text-center ">
                  <li className="py-3 border-b-2">
                    <a href="/" className="list-none  hover:text-indigo-600">
                      Add New Tags
                    </a>
                  </li>
                  <li className="py-3 border-b-2">
                    <a href="/" className="list-none  hover:text-indigo-600">
                      Add New Tags
                    </a>
                  </li>
                  <li className="py-3 border-b-2">
                    <a href="/" className="list-none  hover:text-indigo-600">
                      ccc
                    </a>
                  </li>
                  <li className="py-3 border-b-2">
                    <a href="/" className="list-none  hover:text-indigo-600">
                      ddd
                    </a>
                  </li>
                  <li className="py-3 ">
                    <a
                      href="/"
                      className="list-none border-b-2 hover:text-indigo-600"
                    >
                      eee
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
