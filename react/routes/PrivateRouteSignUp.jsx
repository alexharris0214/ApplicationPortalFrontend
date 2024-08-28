import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRouteSignUp = () => {
  const { user } = useContext(AuthContext);
  if(user){
    if(user.role == "ADMIN"){
      return <Navigate to="/admin"/>
    }
  }
  return user ? <Navigate to="/home" />: <Outlet />  ;
};

export default PrivateRouteSignUp;