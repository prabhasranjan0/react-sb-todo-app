import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../screens/login";
import NotFound from "../screens/notFound";
import Signin from "../screens/signin";
import Dashboard from "../screens/dashboard";
import HeaderBar from "../sharedComponent/headerBar";
import ProfileSetting from "../screens/profileSetting";
import CustomLoader from "../sharedComponent/customLoader";

function Router() {
  const { loader } = useSelector((state) => state.user);
  let token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <HeaderBar />
      <div
        style={{
          marginTop: `50px`,
        }}
      >
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                Boolean(token) ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setting" element={<ProfileSetting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <CustomLoader open={loader} />
    </BrowserRouter>
  );
}

export default Router;
