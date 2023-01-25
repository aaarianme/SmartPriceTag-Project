import React from "react";
var img = require("../Assets/loadingAnimation.gif");
interface ILoaderAnimator {
  text?: string;
}
export default function LoaderAnimator(props: ILoaderAnimator) {
  return (
    <div className="z-20 flex-col inline-flex">
      <img src={img} />
      {props.text && (
        <p className="z-20 m-auto text-lg text-gray-500">{props.text}</p>
      )}
    </div>
  );
}
