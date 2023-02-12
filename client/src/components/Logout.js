import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect } from "react";
import BasicCard from "./BasicCard";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const userCookie = cookies.remove("user");
    navigate("/login");
    window.location.reload();
  });

  return <div></div>;
}
export default Logout;
