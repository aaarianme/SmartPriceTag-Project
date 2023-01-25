import React, { useEffect, useState } from "react";

export interface ICellType {
  text: string | any;
  className?: string;
  onClick?: (cell: ICellType, row: ITableRow) => void;
}
export interface ITableRow {
  rowId?: any;
  cells: Array<ICellType>;
}
export interface ITableHeader {
  text: any;
  className?: string;
}
export interface ITableProps {
  headers: Array<ITableHeader>;
  rows: Array<ITableRow>;
  isSelectable: boolean;
  onCheckChange: (isChecked: boolean, row: ITableRow) => void;
}
export function CustomTable(props: ITableProps) {
  function handleCheck(isChecked: boolean, row: ITableRow) {
    props.onCheckChange?.(isChecked, row);
  }

  function generateCellStyling(cell: ICellType): string {
    var classNames = "";
    if (cell.className != null) classNames = cell.className;
    if (cell.onClick) classNames += " cursor-pointer";
    return classNames;
  }

  return (
    <div className="">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-gray-50 uppercase bg-gray-700">
            <tr>
              {props.isSelectable && <th scope="col" className="p-4"></th>}
              {props.headers.map((h, i) => {
                return (
                  <th
                    scope="col"
                    className={"px-6 py-3 text-white " + h.className}
                    key={i}
                  >
                    {h.text}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {props.rows.map((r, ri) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {props.isSelectable && (
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          onInput={(e) =>
                            handleCheck(
                              (e.target as HTMLInputElement).checked,
                              r
                            )
                          }
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </td>
                  )}
                  {r.cells.map((c, ci) => {
                    return (
                      <td className="px-6 py-4" key={ci}>
                        <label
                          className={generateCellStyling(c)}
                          onClick={() => {
                            c.onClick?.(c, r);
                          }}
                          key={ci}
                        >
                          {c.text}
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
