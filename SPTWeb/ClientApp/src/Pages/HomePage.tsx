import React, { useState } from "react";

export default function HomePage() {
  const [mydata, setData] = useState([]);
  // eslint-disable-next-line
  const [name, setName] = useState("");

  return (
    <div>
      <input id="myinput" onChange={(e) => console.log(e)}></input>
      <button onClick={() => setData([...mydata, name])}>add name</button>
      <div>
        {mydata.map((s, i) => (
          <label>{s}</label>
        ))}
      </div>
    </div>
  );
}
