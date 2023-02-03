import React from "react";

export default function SampleComponent(props) {
  return (
    <div>
      <p className="text-red-500">my name is {props.name}</p>
    </div>
  );
}
