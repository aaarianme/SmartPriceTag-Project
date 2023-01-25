import React from "react";
import LoaderAnimator from "./LoaderAnimator";
interface IFullPageLoadingAnimator {
  show: boolean;
  text?: string;
}
export default function FullPageLoadingAnimator(
  props: IFullPageLoadingAnimator
) {
  return (
    props.show === true && (
      <div className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4  text-center sm:block sm:p-0 pb-40">
          <div
            className="fixed inset-0 bg-gray-100 bg-opacity-90 transition-opacity"
            aria-hidden="true"
          >
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <LoaderAnimator text={props.text}></LoaderAnimator>
          </div>
        </div>
      </div>
    )
  );
}
