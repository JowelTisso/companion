import "./Signup.css";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { userLogIn, userSignUp } from "../helper/authHelper";
import { useNavigate } from "react-router-dom";
import { callToast } from "../../../components/toast/Toast";
import { ROUTES } from "../../../utils/Constant";
import { useDispatch } from "react-redux";
import { loadAllUsers } from "../../../store/homeSlice";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loadAllBookmarks, loadBookmarks } from "../../../store/bookmarkSlice";
import { logIn } from "../../../store/authSlice";

const Signup = () => {
  const defaultCredential = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = useState(defaultCredential);
  const [showPassword, setShowPassword] = useState(false);

  const { username, password, firstName, lastName, email, confirmPassword } =
    credentials;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstNameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, firstName: target.value }));
  };
  const lastNameChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, lastName: target.value }));
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

  const fillTestCredential = () => {
    setCredentials({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@gmail.com",
      password: "john123",
      confirmPassword: "john123",
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (username && password && email && firstName && lastName) {
        if (email.includes("@")) {
          if (password === confirmPassword) {
            const res = await userSignUp({
              username,
              password,
              firstName,
              lastName,
              email,
            });
            if (res?.status === 200 || res?.status === 201) {
              dispatch(loadAllUsers());
              const res = await userLogIn({
                username: username,
                password: password,
              });
              if (res?.status === 200 || res?.status === 201) {
                dispatch(loadAllBookmarks());
                dispatch(loadBookmarks());
                dispatch(
                  logIn({
                    token: res?.data?.encodedToken,
                    user: res?.data?.foundUser,
                  })
                );
                navigate("/", { replace: true });
              }
              setCredentials(defaultCredential);
            }
          } else {
            callToast("Password doesn't match!", false);
          }
        } else {
          callToast("Input an valid email!", false);
        }
      } else {
        callToast("All fields are required!", false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((isVisible) => !isVisible);
  };

  return (
    <div className="login-wrapper flex-center">
      <section className="logo-section logo-section-signup">
        <img src={logo} alt="logo" className="img" />
      </section>
      <section className="login-section signup-section">
        <p className="login-heading t2 text-center">Become a companion</p>
        <form className="form-section" onSubmit={signupHandler}>
          <section className="flex-container">
            <TextField
              className="flex-field"
              label="First name"
              variant="outlined"
              value={firstName}
              onChange={firstNameChangeHandler}
            />
            <TextField
              className="flex-field"
              label="Last name"
              variant="outlined"
              value={lastName}
              onChange={lastNameChangeHandler}
            />
          </section>
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
          <section className="flex-container">
            <TextField
              className="flex-field"
              label="Password"
              variant="outlined"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={passwordChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <IoEyeOff /> : <IoEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="flex-field"
              label="Confirm password"
              variant="outlined"
              value={confirmPassword}
              type="password"
              onChange={confirmPasswordChangeHandler}
            />
          </section>
          <Button
            variant="contained"
            size={"large"}
            className="t3"
            type="submit"
            // onClick={signupHandler}
          >
            Sign up
          </Button>
        </form>
        <p
          className="t5 text-center txt-secondary pointer"
          onClick={fillTestCredential}
        >
          Fill test credential
        </p>
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
