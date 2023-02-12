import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cookies from "universal-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";

const cookies = new Cookies();
const userCookie = cookies.get("user");
console.log(userCookie);

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: userCookie ? <Home /> : <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="781231248766-andg7qqn3te66vti3mc0c31e85pfm3d1.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
