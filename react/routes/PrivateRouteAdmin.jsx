import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user.role == "ADMIN" ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;