import React, { useState } from "react";
import FullPageLoadingAnimator from "../Components/FullPageLoadingAnimator";

export default function SignOutPage() {
  const [state, setState] = useState(false);
  return (
    <div>
      <FullPageLoadingAnimator
        show={!state}
        text="Hang on while we sign you out"
      ></FullPageLoadingAnimator>
    </div>
  );
}
