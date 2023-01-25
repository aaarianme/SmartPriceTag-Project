//#region Imports
import React, { useEffect, useReducer } from "react";
import {
  CustomTable,
  ITableProps,
  ICellType,
  ITableRow,
} from "../Components/CustomTable";
import { IStore } from "../Helpers/Interfaces";
import { useGetRequest } from "../Hooks/HttpsRequest";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import UserNavbar from "../Components/UserNavbar";
import { InlineIconCard } from "../Components/CustomCards";
import {
  CheckCircleIcon,
  XCircleIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
//#endregion

//#region App state manager / useReducer Interfaces
enum ActionKind {
  setAllStores,
  setAllStoresLoaded,
  setFilterTextVal,
}
interface IAction {
  action: ActionKind;
  payload: any;
}
interface IPageState {
  stores: Array<IStore>;
  storesLoaded: boolean;
  filterTextVal: string | null;
}
//#endregion

function reducer(state: IPageState, action: IAction): IPageState {
  const { payload } = action;
  switch (action.action) {
    case ActionKind.setAllStores:
      return { ...state, stores: payload };
    case ActionKind.setAllStoresLoaded:
      return { ...state, storesLoaded: payload };
    case ActionKind.setFilterTextVal:
      return { ...state, filterTextVal: payload };
    default:
      return state;
  }
}

export default function ClientStoresPage() {
  const [state, dispatch] = useReducer(reducer, {
    filterTextVal: null,
  } as IPageState);
  const [loaded, res, makeGetRequest] = useGetRequest();
  useEffect(() => {
    var makecall = async () => {
      await makeGetRequest(
        "api/client/stores",
        {},
        {
          onSuccess: handleAllStoresResponse,
          onFail: handleAllStoresResponseError,
        }
      );
    };
    makecall();
  }, []);

  function handleAllStoresResponse(d) {
    dispatch({ action: ActionKind.setAllStores, payload: d.data.stores });
    dispatch({ action: ActionKind.setAllStoresLoaded, payload: true });
  }
  function handleAllStoresResponseError(err) {
    console.log(err);
  }
  function storeViewRequest(cell: ICellType, row: ITableRow) {}

  function GenerateStoreRows(): Array<ITableRow> {
    var filtered = state.stores;
    if (!filtered) return;
    if (state.filterTextVal) {
      filtered = filtered.filter(
        (x) =>
          x.branchNumber.toString().includes(state.filterTextVal) ||
          x.name.toString().includes(state.filterTextVal)
      );
    }
    var storeRows: Array<ITableRow> =
      filtered.map((s, i) => {
        return {
          rowId: s.branchNumber,
          cells: [
            { text: s.branchNumber, className: "text-lg" },
            { text: s.name },
            {
              text: s.isActive ? "Active" : "Inactive",
              className: s.isActive
                ? "text-white p-2 bg-green-500 rounded"
                : "text-white p-2 bg-red-400 rounded",
            },
            { text: s.address },
            {
              text: "View",
              className: "border-2 border-gray-200 p-2 shadow-md rounded",
              onClick: storeViewRequest,
            },
          ],
        };
      }) ?? [];
    return storeRows;
  }

  var storeRows: Array<ITableRow> = GenerateStoreRows();

  return (
    <div>
      <FullPageLoadingAnimator loaded={state.storesLoaded} />
      <UserNavbar></UserNavbar>
      {state.stores != undefined ? (
        <div className="px-20 pt-10">
          <div className="grid grid-cols-6 gap-4">
            <div key="1" className="col-span-2">
              <InlineIconCard
                Icon={
                  <CheckCircleIcon className="text-green-500 border rounded-full"></CheckCircleIcon>
                }
                textTop={
                  state.stores.filter((x) => x.isActive).length +
                  " Active Stores"
                }
                textBottom={
                  "Newest Store Opend On " +
                  state.stores.sort(
                    (a: IStore, b: IStore) =>
                      new Date(b.createdOn).getDate() -
                      new Date(a.createdOn).getDate()
                  )[0].createdOn
                }
              ></InlineIconCard>
            </div>
            <div key="2" className="col-span-2">
              <InlineIconCard
                Icon={
                  <XCircleIcon className="text-red-500 border rounded-full" />
                }
                textTop={
                  state.stores.filter((x) => !x.isActive).length +
                  " Disabled Stores"
                }
                textBottom="Disabled Stores cant't login"
              ></InlineIconCard>
            </div>
            <div key="3" className="col-span-2">
              <InlineIconCard
                Icon={<BuildingStorefrontIcon className="text-gray-500" />}
                textTop="Add New Store?"
                onClick={() => {}}
              ></InlineIconCard>
            </div>
            <div className="col-span-4">
              {storeRows.length > 0 ? (
                <CustomTable
                  isSelectable={false}
                  headers={[
                    { text: "Branch Number" },
                    { text: "Name" },
                    { text: "status" },
                    { text: "Address" },
                    { text: "Actions" },
                  ]}
                  onCheckChange={(isChecked: boolean, row: ITableRow) => {
                    console.log(isChecked, row);
                  }}
                  rows={storeRows}
                ></CustomTable>
              ) : (
                <p className="text-center text-rose-700 text-3xl mt-10">
                  Nothing here :(
                </p>
              )}
            </div>
            <div className="row-span-2 col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"></div>
                <input
                  type="search"
                  onChange={(e) =>
                    dispatch({
                      action: ActionKind.setFilterTextVal,
                      payload: e.target.value,
                    })
                  }
                  className="block w-full p-4 ml-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-0 focus:ring-offset-0"
                  placeholder="Search Names or Branch Numbers"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-4 bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="..."></div>
            <div className=""></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
