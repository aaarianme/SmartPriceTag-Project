import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import LoaderAnimator from "../Components/LoaderAnimator";
import { useReducer } from "react";
import { useDeleteRequest, useGetRequest } from "../Hooks/HttpsRequest";
import { IItem, IFullItemDetails } from "../Helpers/Interfaces";
import useLocalStorage from "../Hooks/useLocalStorage";
import {
  ErrorPopUp,
  PopUpTrigger,
  usePopUpManager,
  YesNoPopUp,
} from "../Hooks/usePopUpManager";
import StoreNav from "../Components/StoreNav";

interface IPageState {
  loaded: boolean;
  items?: Array<IItem>;
  lastDataUpdate: Date;
}
enum ActionKind {
  setAllItems,
  setItemsLoaded,
  setLastDataUpdate,
}
interface IAction {
  action: ActionKind;
  payload: any;
}
function reducer(state: IPageState, action: IAction): IPageState {
  const { payload } = action;
  switch (action.action) {
    case ActionKind.setItemsLoaded:
      return { ...state, loaded: payload };
    case ActionKind.setAllItems:
      return { ...state, items: payload };
    case ActionKind.setLastDataUpdate:
      return { ...state, lastDataUpdate: payload };
    default:
      return state;
  }
}
export default function StoreItemsPage() {
  const [state, dispatch] = useReducer(reducer, {
    loaded: false,
  } as IPageState);
  const [loaded, res, makeGetRequest] = useGetRequest();
  const makeDeleteRequest = useDeleteRequest();
  const [getLS, setLS, removeLS] = useLocalStorage();
  const [setPopUp, removePopUp, popUp] = usePopUpManager();
  function addToLocalStorage(data: any): string {
    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    } as const;
    let dateNow = new Date().toLocaleDateString("en-US", options);
    setLS("storeItemDetails", {
      items: data,
      lastUpdate: dateNow,
    });
    return dateNow;
  }
  async function getAllItems() {
    dispatch({ action: ActionKind.setItemsLoaded, payload: false });
    await makeGetRequest("/api/items", null, {
      onSuccess: (res) => {
        let dateNow = addToLocalStorage(res.data.items);
        dispatch({
          action: ActionKind.setLastDataUpdate,
          payload: dateNow,
        });
        dispatch({ action: ActionKind.setAllItems, payload: res.data.items });
        dispatch({ action: ActionKind.setItemsLoaded, payload: true });
      },
    });
  }
  async function deleteItem(itemid: number) {
    let a = state.items.filter((x) => x.itemID == itemid);
    let rest = state.items.filter((x) => x.itemID !== itemid);
    dispatch({ action: ActionKind.setAllItems, payload: rest });

    await makeDeleteRequest(
      "api/items/" + itemid,
      {},
      {
        onSuccess: (res) => {
          let dateNow = addToLocalStorage(rest);
          dispatch({
            action: ActionKind.setLastDataUpdate,
            payload: dateNow,
          });
        },
        onFail: () => {
          setPopUp(
            <ErrorPopUp
              header="Error deleting an item"
              message="Your item was not deleted."
              buttonText="Okay"
              onButtonClick={removePopUp}
            />
          );
        },
      }
    );
  }
  useEffect(() => {
    var lsData = getLS<{ items: IItem; lastUpdate: Date }>("storeItemDetails");
    console.log(lsData);
    if (lsData == undefined) getAllItems();
    else {
      dispatch({
        action: ActionKind.setLastDataUpdate,
        payload: lsData.lastUpdate,
      });
      dispatch({ action: ActionKind.setAllItems, payload: lsData.items });
      dispatch({ action: ActionKind.setItemsLoaded, payload: true });
    }
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state]);

  let allItemDetails: Array<IFullItemDetails> = GenerateFullItemDetails();
  function GenerateFullItemDetails(): Array<IFullItemDetails> {
    if (state.items == undefined) return;
    let newArr: Array<IFullItemDetails> = [];
    state.items.forEach((item) => {
      newArr.push({ item: item, images: null, campaigns: null, tag: null });
    });
    return newArr;
  }
  return (
    <>
      <StoreNav></StoreNav>
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
                      {allItemDetails?.length}
                    </span>
                  </p>
                </li>
                <li>
                  <a
                    href="/s/items/new"
                    className="flex items-center p-2 text-base font-normal text-zinc-400 hover:text-zinc-50 rounded-lg "
                  >
                    <PlusIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Add New
                    </span>
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
              {state.loaded && state.lastDataUpdate != null && (
                <div className="bg-orange-100 text-orange-800 rounded-md mt-2 p-2 text-xs font-thin">
                  {Math.ceil(
                    Math.abs(
                      new Date().getDate() -
                        new Date(state.lastDataUpdate).getDate()
                    )
                  ) >= 2 ? (
                    <p>
                      WARNING: Your data is{" "}
                      {Math.ceil(
                        Math.abs(
                          new Date().getDate() -
                            new Date(state.lastDataUpdate).getDate()
                        )
                      )}{" "}
                      days old. To update, click on Last Update
                    </p>
                  ) : (
                    <p>
                      Your data is fairly recent. To update, click on Last
                      Update.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="p-4 border-l-2 border-gray-200 border-dashed w-full grow dark:border-gray-700">
          <section className="py-1">
            <div className="w-full  mb-12  px-4">
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
                          className="bg-orange-500 text-white text-xs cursor-pointer font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            getAllItems();
                          }}
                        >
                          Last Update: {state.lastDataUpdate}
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
                            Internal ID
                          </th>
                          <th className="px-6  align-middle border border-solid  py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {allItemDetails.length >= 1 ? (
                          allItemDetails.map((detail) => (
                            <tr className="border-b">
                              <th className="px-6 align-middle text-xs whitespace-nowrap p-4 text-left">
                                {detail.item.itemID}
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {detail.item.name}
                              </td>
                              <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {detail.item.weight} KG
                              </td>

                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {detail.item.internalID}
                              </td>
                              <td className="border-t-0 px-6 align-middle border text-xs whitespace-nowrap p-4 text-center">
                                <div className="flex flex-row justify-center ">
                                  <a
                                    className="text-blue-400 font-thin w-full"
                                    href={"/s/items/" + detail.item.itemID}
                                  >
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                  </a>
                                  <span
                                    className="text-red-800 font-thin w-full"
                                    onClick={() => {
                                      setPopUp(
                                        <YesNoPopUp
                                          onYesButtonClick={() => {
                                            deleteItem(detail.item.itemID);
                                            removePopUp();
                                          }}
                                          onNoButtonClick={() => removePopUp()}
                                          header={
                                            "Delete Item #" + detail.item.itemID
                                          }
                                          message="You are about to delete an item. This action is not reversible."
                                          yesButtonText="Yes, Delete it."
                                          noButtonText="Never Mind"
                                        />
                                      );
                                    }}
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </span>
                                  <a
                                    href={
                                      "/s/items/" + detail.item.itemID + "/edit"
                                    }
                                    className="text-zinc-400 font-thin w-full"
                                  >
                                    <PencilIcon className="w-5 h-5" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="border-b">
                            <th className="px-6 align-middle text-xs whitespace-nowrap p-4 text-left">
                              Start by adding your first item
                            </th>
                          </tr>
                        )}
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
        <PopUpTrigger popUp={popUp} />
      </div>
    </>
  );
}
