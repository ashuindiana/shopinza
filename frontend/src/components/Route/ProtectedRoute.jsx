import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {!loading &&
        (isAuthenticated === false ? (
          <Navigate replace to={redirectTo} />
        ) : (
          children
        ))}
    </>
  );
};

export default ProtectedRoute;
