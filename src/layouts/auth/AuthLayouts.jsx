import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Auth/Login";

const AuthLayouts = () => {
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <Routes>
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AuthLayouts;
