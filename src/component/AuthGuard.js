import { UserContext } from "src/context/User";
import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function AuthGuard(props) {
  const { children } = props;
  const auth = useContext(UserContext);

  if (!auth.isLogin) {
    return <Redirect to='/' />;
  }
  if (auth?.walletData?.status === "BLOCK") {
    return <Redirect to='/request-message' />;
  }

  return <>{children}</>;
}
export function BlockGuard(props) {
  const { children } = props;
  const auth = useContext(UserContext);

  return <>{children}</>;
}
