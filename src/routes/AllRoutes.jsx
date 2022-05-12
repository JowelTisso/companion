import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login } from "../pages";
import PrivateRoutes from "./PrivateRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
