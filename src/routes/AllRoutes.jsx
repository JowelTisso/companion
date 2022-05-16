import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, NotFound, Signup } from "../pages";
import PrivateRoutes from "./PrivateRoutes";
import ContentRoutes from "./ContentRoutes";

const AllRoutes = () => {
  return (
    <ContentRoutes>
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
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContentRoutes>
  );
};

export default AllRoutes;
