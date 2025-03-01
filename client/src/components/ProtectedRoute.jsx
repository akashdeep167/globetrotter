import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("jwtToken");
  return token ? (
    <>
      <Header />
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
