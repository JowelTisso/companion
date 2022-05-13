import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  return auth.token ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
