import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";

function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
    profileLink: "",
  });

  const cookies = new Cookies();
  const userCookie = cookies.get("user");

  function getUnProtectedData() {
    // get node get_request for unprotected request
    axios({
      url: "http://localhost:3001/home/unprotected",
      method: "get",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getProtectedData() {
    // get node get_request for unprotected request
    axios({
      url: "http://localhost:3001/home/protected",
      method: "get",
      headers: {
        "x-access-token": userCookie, // Basically JWT Token
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Button onClick={() => getUnProtectedData()}>Un-Protected</Button>
      <Button onClick={() => getProtectedData()}>Protected</Button>
    </div>
  );
}
export default Home;
