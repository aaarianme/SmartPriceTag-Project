import React from "react";

export default function PageNotFound() {
  return (
    <div className="flex bg-red-500 h-screen">
      <div className="m-auto pb-60">
        <h1 className="text-black text-6xl font-thin">Such Empty :(</h1>
        <h2 className="text-xl mt-2 text-red-900">Here's why this happens:</h2>
        <label className="pl-2 block text-red-900">
          -You are not authorized to view this resource.
        </label>
        <label className="pl-2 block text-red-900">
          -This page doesn't exist.
        </label>
        <label className="pl-2 block text-red-900">
          -Your server request was not processed due to an error.
        </label>
      </div>
    </div>
  );
}
