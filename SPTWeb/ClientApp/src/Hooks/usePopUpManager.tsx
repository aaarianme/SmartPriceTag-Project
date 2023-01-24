import { ReactElement, useState } from "react";
import React from "react";

interface IpopUpManagerOptions {
  popUp: ReactElement;
  visible: boolean;
}

export function usePopUpManager() {
  const [popUp, setPopUp] = useState<ReactElement | null>();
  const setNewPopUp = (elem: ReactElement) => {
    setPopUp(elem);
  };
  const removePopUp = () => {
    setPopUp(null);
  };
  return [setNewPopUp, removePopUp, popUp] as const;
}
export function PopUpTrigger({ popUp }: { popUp: any }) {
  return popUp !== null ? popUp : <></>;
}
export function LinkPopUp() {
  return (
    <div className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  header
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">message</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a
              type="button"
              href="/"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              hi
            </a>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 white text-base font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IMessagePopUp {
  header: string;
  message?: string;
  buttonText?: string;
  onButtonClick: Function;
}
export function MessagePopUp(props: IMessagePopUp) {
  return (
    <div
      className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4  text-center sm:block sm:p-0 pb-40">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-800"
                  id="modal-title"
                >
                  {props.header}
                </h3>
                <div className="mt-2 flex flex-row">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => props.onButtonClick()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.buttonText ?? "Okay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IErrorPopUp {
  header: string;
  message?: string;
  buttonText?: string;
  onButtonClick: Function;
  retry?: {
    canRetry: boolean;
    retryFunction?: Function;
    retryButtonText: string;
  };
}
export function ErrorPopUp(props: IErrorPopUp) {
  return (
    <div
      className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4  text-center sm:block sm:p-0 pb-40">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white border-rose-600 border-solid border-4 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-rose-700"
                  id="modal-title"
                >
                  {props.header}
                </h3>
                <div className="mt-2 flex flex-row">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => props.onButtonClick()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.buttonText ?? "Okay"}
            </button>
            {props.retry?.canRetry && (
              <button
                onClick={() => props.retry?.retryFunction?.()}
                type="button"
                className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {props.retry?.retryButtonText ?? "Retry"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  onClose?: Function;
  onAccept?: Function;
  onCancel?: Function;
*/
