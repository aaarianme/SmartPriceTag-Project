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
//#endregion

//#region App state manager / useReducer Interfaces
enum ActionKind {
  setAllStores,
}
interface IAction {
  action: ActionKind;
  payload: any;
}
interface IPageState {
  allStores: Array<IStore>;
}
//#endregion

function reducer(state: IPageState, action: IAction): IPageState {
  const { payload } = action;
  switch (action.action) {
    case ActionKind.setAllStores:
      return { ...state, allStores: payload };
    default:
      return state;
  }
}

function handleAllStoresResponse(res) {
  console.log(res);
}
function handleAllStoresResponseError(err) {
  console.log(err);
}
export default function ClientStoresPage() {
  const [state, dispatch] = useReducer(reducer, {} as IPageState);
  const [loaded, res, makeGetRequest] = useGetRequest();
  useEffect(() => {
    makeGetRequest(
      "api/client/stores",
      {},
      {
        onSuccess: handleAllStoresResponse,
        onFail: handleAllStoresResponseError,
      }
    );
  }, []);
  useEffect(() => {
    console.log("new state:", state);
  }, [state]);

  var rows: Array<ITableRow> = [
    {
      cells: [
        { text: "cell1", onClick: () => {}, className: "bg-red-200" },
        { text: "cell2" },
      ],
    },
    {
      cells: [{ text: "cell1" }, { text: "cell2" }],
    },
  ];
  return (
    <div>
      <CustomTable
        isSelectable={true}
        headers={["name", "lastname", "contact"]}
        onCheckChange={(isChecked: boolean, row: ITableRow) => {
          console.log(isChecked, row);
        }}
        rows={rows}
      ></CustomTable>
    </div>
  );
}
