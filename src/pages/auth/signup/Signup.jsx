import "./Signup.css";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Button } from "@mui/material";
import { userSignUp } from "../helper/authHelper";
import { useNavigate } from "react-router-dom";
import { callToast } from "../../../components/toast/Toast";
import { ROUTES } from "../../../utils/Constant";

const Signup = () => {
  const defaultCredential = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = useState(defaultCredential);

  const { username, password, fullname, email, confirmPassword } = credentials;
  const navigate = useNavigate();

  const fullnameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, fullname: target.value }));
  };
  const usernameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, username: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
  };
  const emailChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, email: target.value }));
  };
  const confirmPasswordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, confirmPassword: target.value }));
  };

  const signupHandler = async () => {
    try {
      if (username && password && email && fullname) {
        if (password === confirmPassword) {
          const res = await userSignUp({
            username,
            password,
            fullname,
            email,
          });
          if (res?.status === 200 || res?.status === 201) {
            setCredentials(defaultCredential);
          }
        } else {
          callToast("Password doesn't match!", false);
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
      <section className="login-section signup-section">
        <p className="login-heading t2 text-center">Become a companion</p>
        <TextField
          label="Fullname"
          variant="outlined"
          value={fullname}
          onChange={fullnameChangeHandler}
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={emailChangeHandler}
        />
        <section className="password-container">
          <TextField
            className="password-field"
            label="Password"
            variant="outlined"
            value={password}
            onChange={passwordChangeHandler}
          />
          <TextField
            className="password-field"
            label="Confirm password"
            variant="outlined"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
          />
        </section>
        <Button
          variant="contained"
          size={"large"}
          className="t3"
          onClick={signupHandler}
        >
          Sign up
        </Button>
        <p className="t4 text-center">OR</p>
        <p className="t5 text-center txt-secondary">Already have an account!</p>
        <Button
          variant="contained"
          size={"large"}
          className="t3"
          color="secondary"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Login
        </Button>
      </section>
    </div>
  );
};

export default Signup;
