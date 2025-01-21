import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Home from "./pages/home/home";
import Posts from "./components/posts/posts";

const Router = () => {
  const PrivateRouteLogin = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    const user = JSON.parse(localStorage.getItem("user"));

    let particularuser = null;
    if (user && currentUser) {
      particularuser = user[currentUser.email];
    }
    if (!particularuser) {
      return children;
    }

    return <Navigate to="/home" />;
  };

  const PrivateRouteHome = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    const user = JSON.parse(localStorage.getItem("user"));

    let particularuser = null;
    if (user && currentUser) {
      particularuser = user[currentUser.email];
    }
    if (particularuser) {
      return children;
    }

    return <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouteLogin>
            <SignIn />
          </PrivateRouteLogin>
        }
      />
      <Route
        path="/signup"
        element={
          <PrivateRouteLogin>
            <SignUp />
          </PrivateRouteLogin>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};

export default Router;
