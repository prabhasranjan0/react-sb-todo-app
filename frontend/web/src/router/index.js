import React from "react";
import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";
import Login from "../screens/login";
import NotFound from "../screens/notFound";
import Signin from "../screens/signin";
import Dashboard from "../screens/dashboard";
import HeaderBar from "../sharedComponent/headerBar";
import ProfileSetting from "../screens/profileSetting";

function Router() {
  return (
    <BrowserRouter>
      <HeaderBar />
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
