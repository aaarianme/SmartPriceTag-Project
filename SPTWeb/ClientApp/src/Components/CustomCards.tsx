import React, { ReactElement } from "react";
interface IInlineCard {
  textTop: any;
  textBottom?: any;
  Icon: ReactElement;
  onClick?: Function;
}
export function InlineIconCard(props: IInlineCard) {
  return (
    <div className={props.onClick ? "cursor-pointer" : ""}>
      <div
        className={"flex items-start rounded-xl bg-white p-4 shadow-md "}
        onClick={() => {
          props.onClick?.();
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full">
          {props.Icon}
        </div>
        <div className="ml-4">
          {props.textBottom ? (
            <>
              <h2 className="font-semibold">{props.textTop}</h2>
              <p className="mt-2 text-sm text-gray-500">{props.textBottom}</p>
            </>
          ) : (
            <h2 className="font-semibold mt-3">{props.textTop}</h2>
          )}
        </div>
      </div>
    </div>
  );
}
interface ILinkCard {
  text: any;
  Icon: ReactElement;
  onClick?: Function;
  className: string;
  link: any;
}
export function LinkCard(props: ILinkCard) {
  return (
    <a
      className={props.onClick ? "cursor-pointer" : "w-auto"}
      href={props.link}
    >
      <div
        className={"flex items-start p-2 " + props.className}
        onClick={() => {
          props.onClick?.();
        }}
      >
        <div className="flex h-14 w-12 items-center justify-center rounded-full">
          {props.Icon}
        </div>
        <div className="ml-4 text-lg text-white">
          <h2 className="font-thin mt-3">{props.text}</h2>
        </div>
      </div>
    </a>
  );
}
