import React from "react";

export default function SignUpPage() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-1/12 bg-green-500"></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-900">
                SptWeb - Signup
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                You can create a new Master account below. To see a demo, click
                on signin as demo.
              </p>

              <div className="mt-6">
                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <input
                    placeholder="Username"
                    className="flex justify-center w-full px-6 py-3 mt-4 text-gray-500 border border-gray-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:gray-blue-400 dark:text-gray-400 focus:outline-none"
                  ></input>
                  <input
                    placeholder="Password"
                    className="flex justify-center w-full px-6 py-3 mt-4 text-gray-500 border border-gray-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:gray-blue-400 dark:text-gray-400 focus:outline-none"
                  ></input>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">
                  <span>Sign Up</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <a
                  href="/demo"
                  className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  <span>Sign in as Demo</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
