import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";
import { usePostRequest } from "../Hooks/HttpsRequest";
import useLocalStorage from "../Hooks/useLocalStorage";

export default function SignOutPage() {
  const [state, setState] = useState(false);
  const [getLs, SetLs, RemoveLs] = useLocalStorage();
  const navigate = useNavigate();
  const makePostReq = usePostRequest();
  async function requestSignOut() {
    await makePostReq(
      "/api/auth/signout",
      {},
      {
        onSuccess: () => {
          RemoveLs("userType");
          RemoveLs("userInfo");
          RemoveLs("store");
          setState(true);
          navigate("/");
        },
      }
    );
  }
  useEffect(() => {
    requestSignOut();
  }, []);
  return (
    <div>
      <FullPageLoadingAnimator
        show={!state}
        text="Hang on while we sign you out"
      ></FullPageLoadingAnimator>
    </div>
  );
}
