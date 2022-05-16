import "./Header.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogout } from "../../pages/auth/helper/authHelper";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import SearchInput from "./component/SearchInput";

const Header = () => {
  const dispatch = useDispatch();

  const applySearch = ({ key, target }) => {
    // if (key === "Enter") {
    //   const filteredBySearch = filterByTitle(target.value, products);
    //   filterDispatch({ type: PRODUCT_DATA, payload: filteredBySearch });
    // }
  };

  return (
    <header className="header-container pd-1x pd-right-2x pd-left-2x">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <Link to={"/"} className=" mg-left-1x pointer logo-title no-deco">
          Companion
        </Link>
      </div>
      <div className="right-header-section">
        <SearchInput applySearch={applySearch} />
        <Button
          variant="contained"
          size={"large"}
          onClick={() => {
            userLogout(dispatch);
          }}
          sx={{ borderRadius: 3, boxShadow: "none" }}
        >
          Logout
        </Button>
        <Avatar sx={{ borderRadius: 2 }} variant="rounded">
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="profile avatar"
            className="avatar pointer"
          />
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
