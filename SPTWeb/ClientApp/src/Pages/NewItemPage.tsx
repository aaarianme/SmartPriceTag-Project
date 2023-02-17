import React, { useEffect, useState } from "react";
import StoreNav from "../Components/StoreNav";
import { usePostRequest } from "../Hooks/HttpsRequest";

export default function NewItemPage() {
  const [files, setFiles] = useState<{ name: string; file: File }>();
  const [state, setState] = useState<{
    productDesc: string;
    name: string;
    internalId: string;
    weight: string;
    netWeight: string;
  }>();

  const post = usePostRequest();
  useEffect(() => {
    console.log(files);
  }, [files]);
  async function PostItem() {
    const formData = new FormData();
    formData.append("formFile", files.file);
    formData.append("fileName", files.name);
    formData.append("jsondata", JSON.stringify(state));

    let res = await post("/api/items", formData);
    console.log(res);
  }
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
                    onChange={(e) => {
                      setState({ ...state, name: e.target.value });
                    }}
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
                    onChange={(e) => {
                      setState({ ...state, internalId: e.target.value });
                    }}
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
                    onChange={(e) => {
                      setState({ ...state, weight: e.target.value });
                    }}
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
                    type="file"
                    onChange={(e) => {
                      setFiles({
                        file: e.target.files[0],
                        name: e.target.files[0].name,
                      });
                    }}
                    multiple
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
                    onChange={(e) => {
                      setState({ ...state, netWeight: e.target.value });
                    }}
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
                    onChange={(e) => {
                      setState({ ...state, productDesc: e.target.value });
                    }}
                    name="first-name"
                    className="mt-1 block w-full py-3 px-2 border-gray-100 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              onClick={() => PostItem()}
              className="inline-flex justify-center rounded-md border border-transparent bg-zinc-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
