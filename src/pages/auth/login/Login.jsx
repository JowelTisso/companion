import "./Login.css";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Button } from "@mui/material";
import { userLogIn } from "../helper/authHelper";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../../store/authSlice";
import { callToast } from "../../../components/toast/Toast";
import { ROUTES } from "../../../utils/Constant";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, username: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
  };

  const fillTestCredentials = () => {
    setCredentials((state) => ({
      ...state,
      username: "testcase",
      password: "test123",
    }));
  };

  const loginHandler = async () => {
    try {
      if (username && password) {
        const res = await userLogIn({
          username: username,
          password: password,
        });
        if (res?.status === 200 || res?.status === 201) {
          dispatch(
            logIn({
              token: res?.data?.encodedToken,
              user: res?.data?.foundUser,
            })
          );
          navigate(from, { replace: true });
        }
      } else {
        callToast("All fields are required!", false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-wrapper flex-center">
      <section className="logo-section">
        <img className="logo" src={logo} alt="logo" />
      </section>
      <section className="login-section">
        <p className="login-heading t2 text-center">Welcome</p>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={passwordChangeHandler}
        />
        <Button
          variant="contained"
          size={"large"}
          className="t3"
          onClick={loginHandler}
        >
          Login
        </Button>
        <div className="secondary-txt-container">
          <p
            className="t5 text-center pointer txt-secondary"
            onClick={fillTestCredentials}
          >
            Test credential
          </p>
          <span className="txt-separator text-center">|</span>
          <p className="t5 text-center pointer txt-secondary">
            Forgot password?
          </p>
        </div>
        <p className="t4 text-center">OR</p>
        <Button
          variant="contained"
          size={"large"}
          className="t3"
          color="secondary"
          onClick={() => navigate(ROUTES.SIGNUP)}
        >
          Signup
        </Button>
      </section>
    </div>
  );
};

export default Login;
