import "./Login.css";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <div className="login-wrapper flex-center">
      <section className="logo-section">
        <img className="logo" src={logo} alt="logo" />
      </section>
      <section className="login-section">
        <p className="login-heading t2 text-center">Login</p>
        <TextField label="Username" variant="outlined" />
        <TextField label="Password" variant="outlined" />
        <Button variant="contained" size={"large"} className="t3">
          Login
        </Button>
        <p className="t5 text-center pointer">Forgot password?</p>
        <p className="t4 text-center">OR</p>
        <Button
          variant="contained"
          size={"large"}
          className="t3"
          color="secondary"
        >
          Signup
        </Button>
      </section>
    </div>
  );
};

export default Login;
