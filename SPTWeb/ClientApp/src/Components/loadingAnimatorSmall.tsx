import React from "react";
var img = require("../Assets/loadingAnimation.gif");
var img2 = require("../Assets/loadingAnimationSmall.gif");

interface ILoaderAnimator {
  text?: string;
}
export default function LoadingAnimatorSmall(props: ILoaderAnimator) {
  return (
    <div className="z-20 flex-col inline-flex">
      <img src={img2} />
      {props.text && (
        <p className="z-20 m-auto text-lg text-gray-500">{props.text}</p>
      )}
    </div>
  );
}
