import "./Header.css";
import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogout } from "../../pages/auth/helper/authHelper";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="header">
      Header
      <Button
        variant="contained"
        size={"large"}
        className="t3"
        onClick={() => {
          userLogout(dispatch);
        }}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
