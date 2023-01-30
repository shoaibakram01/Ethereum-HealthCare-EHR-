import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  // console.log("groups :")
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.setItem("healthCare", 'token' )
    var x = localStorage.getItem("healthCare");
    if (x != 'token') {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
