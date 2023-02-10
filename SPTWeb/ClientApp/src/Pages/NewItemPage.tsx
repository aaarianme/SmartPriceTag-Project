import React from "react";
import StoreNav from "../Components/StoreNav";

export default function NewItemPage() {
  return (
    <div>
      <StoreNav></StoreNav>
      <div className="p-10">
        <div className="">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add New Items
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              You have to add items one at a time
            </p>
          </div>
        </div>
        <div className="mt-3 md:col-span-2 md:mt-0  border">
          <div className="overflow-hidden">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Name
                  </label>
                  <input
                    name="first-name"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Internal ID
                  </label>
                  <input
                    name="first-name"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Weight
                  </label>
                  <input
                    name="first-name"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 pt-5">
                <div className="col-span-6">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Images
                  </label>
                  <input
                    name="first-name"
                    type="button"
                    value="Upload"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Net Weight
                  </label>
                  <input
                    name="first-name"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
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
      </div>
    </div>
  );
}
