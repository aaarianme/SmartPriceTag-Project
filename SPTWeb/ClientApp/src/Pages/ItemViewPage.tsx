import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import StoreNav from "../Components/StoreNav";
import { IItem } from "../Helpers/Interfaces";
import { useGetRequest } from "../Hooks/HttpsRequest";
import PageNotFound from "./PageNotFound";
interface IPageState {
  loaded: boolean;
  itemDetails: { item: IItem; images: Array<string> };
  currentImageIndex: number;
}
export default function ItemViewPage() {
  const { itemId } = useParams();
  const [state, setState] = useState<IPageState>({
    loaded: false,
    itemDetails: null,
    currentImageIndex: 0,
  });
  const [loaded, res, makeGetRequest] = useGetRequest();
  async function pageSetUp() {
    if (isNaN(itemId as any)) return;
    let id = parseInt(itemId);
    await makeGetRequest(
      "/api/items/" + id,
      {},
      {
        onSuccess: (res) => {
          let { item } = res.data;
          setState({ ...state, itemDetails: item, loaded: true });
        },
        onFail: () => {},
      }
    );
  }
  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(() => {
    pageSetUp();
  }, []);
  if (isNaN(itemId as any))
    return <PageNotFound error="Item not found"></PageNotFound>;
  if (!state.loaded)
    return (
      <FullPageLoadingAnimator
        show={!state.loaded}
        text={"Loading Item #" + itemId}
      ></FullPageLoadingAnimator>
    );
  return (
    state.itemDetails.item && (
      <>
        <StoreNav></StoreNav>
        <div className="p-10">
          <p className="text-slate-700 mb-2 ">
            <span className="font-bold">
              {state.itemDetails.item.name} #{state.itemDetails.item.internalID}
            </span>{" "}
          </p>
          <p className="text-slate-700 mb-5 ">
            Description:
            <span className=""> {state.itemDetails.item.productDesc}</span>{" "}
          </p>
          <div className="block w-full overflow-x-auto px-10 text-center">
            <table className="items-center bg-transparent w-full border-collapse text-center text-lg ">
              <thead>
                <tr>
                  <th className="px-6  text-center align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold">
                    ItemID
                  </th>
                  <th className="px-6  align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Name
                  </th>
                  <th className="px-6   align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Weight
                  </th>
                  <th className="px-6  align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Net Weight
                  </th>
                  <th className="px-6  align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Internal ID
                  </th>
                  <th className="px-6  align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Actions
                  </th>
                  <th className="px-6  align-middle border border-solid  py-3  border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Tag
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <th className="px-6 align-middle  whitespace-nowrap p-4   ">
                    {state.itemDetails.item.itemID}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 ">
                    {state.itemDetails.item.name}
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0  whitespace-nowrap p-4">
                    {state.itemDetails.item.weight}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                    {state.itemDetails.item.netWeight}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                    {state.itemDetails.item.internalID}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                    <a className="text-blue-400 font-thin w-full">
                      {state.itemDetails.item.itemID}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-40">
            <div
              id="default-carousel"
              className="relative"
              data-carousel="static"
            >
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div>
                  {state.itemDetails.images.length == 0 ? (
                    <div className="absolute block w-80 h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center">
                      <label className="p-10 rounded-xl bg-blue-500 text-white">
                        Upload Images
                        <ArrowUpOnSquareIcon className="w-20 h-auto" />
                      </label>
                    </div>
                  ) : (
                    <img
                      src={
                        "data:image/png;base64," +
                        state.itemDetails.images[state.currentImageIndex]
                      }
                      className="absolute block w-80 h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    />
                  )}
                </div>
              </div>
              <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
              </div>
              <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={() => {
                  if (state.currentImageIndex - 1 >= 0) {
                    setState((pre) => ({
                      ...pre,
                      currentImageIndex: pre.currentImageIndex - 1,
                    }));
                  }
                }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={() => {
                  if (
                    state.currentImageIndex + 1 <
                    state.itemDetails.images.length
                  ) {
                    setState((pre) => ({
                      ...pre,
                      currentImageIndex: pre.currentImageIndex + 1,
                    }));
                  }
                }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
