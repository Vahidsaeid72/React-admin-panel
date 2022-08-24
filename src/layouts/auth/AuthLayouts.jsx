import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLogin } from "../../hook/authHook";
import Login from "../../pages/Auth/Login";

const AuthLayouts = () => {
  const [isLogin, loading] = useIsLogin(); //useing from my personal hook
  return (
    <>
      <div className="limiter">
        {loading ? (
          <h1 className="text-center waiting_center">لطفا صبر کنید</h1>
        ) : !isLogin ? (
          <div className="container-login100">
            <Routes>
              <Route path="/auth/Login" element={<Login />} />
            </Routes>
          </div>
        ) : (
          <Navigate to={"/"} />
        )}
      </div>
    </>
  );
};

export default AuthLayouts;
