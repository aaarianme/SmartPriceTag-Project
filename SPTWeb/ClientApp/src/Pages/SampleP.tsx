import React, { useEffect, useState } from "react";
import { useGetRequest } from "../Hooks/HttpsRequest";

export default function SampleP() {
  const [state, setState] = useState<number>(0);
  const [state2, setState2] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<any>();

  const [isLoaded, result, makeARequest] = useGetRequest();

  async function getData() {
    await makeARequest(
      "api/auth/client",
      { username: "a", password: "a" },
      {
        onSuccess: (res) => {
          console.log("res is", res.data);
          setUserInfo(res.data.user);
        },
      }
    );
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-400">
      <p>State 1 is :{state}</p>
      <p>State 2 is :{state2}</p>

      {isLoaded == true && <div>Hi</div>}

      <button onClick={() => setState((state) => state + 1)}>
        btn for state 1
      </button>
      <button onClick={() => setState2((state) => state + 1)}>
        btn for state 2
      </button>
    </div>
  );
}
