import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import * as React from "react";
import BasicCard from "./BasicCard";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

const CenterLayout = ({ children }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      {children}
    </div>
  );
};

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = (cred) => {
    console.log("Successfully went through Google's OAuth2.0 flow");
    // call api to store user session in db
    axios({
      url: "http://localhost:3001/user",
      method: "post",
      headers: {
        "x-access-token": cred, // Basically JWT Token
      },
    })
      .then((response) => {
        console.log(response);
        setCookie(cred);
      })
      .catch((err) => {
        console.log("Call to user endpoint to update the db failed");
        console.log(err);
      });
  };

  const setCookie = (cred) => {
    const cookies = new Cookies();
    cookies.set("user", cred, {
      path: "/",
    });
    navigate("/home");
    window.location.reload();
  };

  return (
    <div>
      <Grid container>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div>
            <BasicCard>
              <h1>Login</h1>
              <center>
                <GoogleLogin
                  className={{ minWidth: 200 }}
                  onSuccess={(credentialResponse) =>
                    handleGoogleLogin(credentialResponse.credential)
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </center>

              <p>or</p>
              <Button size="large" onClick={() => setCookie("")}>
                Continue as Guest
              </Button>
            </BasicCard>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Login;
