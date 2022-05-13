import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Button } from "@mui/material";
import { userLogIn, userSignUp } from "../helper/authHelper";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../../store/authSlice";
import { callToast } from "../../../components/toast/Toast";
import { ROUTES } from "../../../utils/Constant";

const Signup = () => {
  const defaultCredential = {
    username: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(defaultCredential);

  const { username, password } = credentials;
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, username: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
  };

  const signupHandler = async () => {
    try {
      if (username && password) {
        const res = await userSignUp({
          username: username,
          password: password,
        });
        if (res?.status === 200 || res?.status === 201) {
          setCredentials(defaultCredential);
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
        <p className="login-heading t2 text-center">Become a companion</p>
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
          onClick={signupHandler}
        >
          Sign up
        </Button>
        <p className="t4 text-center">OR</p>

        <div className="secondary-txt-container">
          <p className="t5 text-center txt-secondary">
            Already have an account!
          </p>
        </div>
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
