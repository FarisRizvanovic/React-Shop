import React, { useEffect, useState } from "react";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const loginExpiryTimestap = Cookies.get("_auth_storage");

    console.log(loginExpiryTimestap);
    if (loginExpiryTimestap === undefined || loginExpiryTimestap === null) {
      setAuth(false);
    }
  }, []);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace={true}
      state={{ from: window.location.pathname }}
    />
  );
};

export default PrivateRoute;
