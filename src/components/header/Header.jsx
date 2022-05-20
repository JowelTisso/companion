import "./Header.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../pages/auth/helper/authHelper";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./component/SearchInput";
import { getUser, getUserPosts } from "../../store/profileSlice";
import { ROUTES } from "../../utils/Constant";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applySearch = ({ key, target }) => {
    //
  };

  const goToProfile = () => {
    dispatch(getUser(user._id));
    dispatch(getUserPosts(user.username));
    navigate(ROUTES.PROFILE);
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
          variant="outlined"
          size={"large"}
          onClick={() => {
            userLogout(dispatch);
          }}
          sx={{ borderRadius: 3, boxShadow: "none", height: "35px", border: 2 }}
        >
          Logout
        </Button>
        <Avatar
          sx={{ width: 35, height: 35 }}
          src={user.avatar}
          alt="profile avatar"
          className=" pointer"
          onClick={goToProfile}
        />
      </div>
    </header>
  );
};

export default Header;
