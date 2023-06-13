import React, { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default Private;
