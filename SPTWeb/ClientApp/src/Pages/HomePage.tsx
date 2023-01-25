import React, { useState } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-3 m-20">
      <div>
        <a href="/login">login</a>
      </div>
      <div>
        <a href="/login/master">Master login</a>
      </div>
      <div>
        <a href="/login/store">Store login</a>
      </div>
      <div>
        <a href="/notfound404">Not Found Page</a>
      </div>
      <div>
        <a href="/u">Client Dashboard</a>
      </div>
      <div>
        <a href="/signout">SignOut</a>
      </div>
    </div>
  );
}
