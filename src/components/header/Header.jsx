import "./Header.css";
import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../pages/auth/helper/authHelper";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { getUser, getUserPosts } from "../../store/profileSlice";
import { ROUTES } from "../../utils/Constant";
import { toggleTheme } from "../../store/themeSlice";
import { IoMoon, IoSunny, IoSearchOutline } from "react-icons/io5";
import SearchInput from "./component/SearchInput";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleThemeFunc = () => {
    dispatch(toggleTheme());
  };

  const goToProfile = () => {
    dispatch(getUser(user._id));
    dispatch(getUserPosts(user.username));
    navigate(ROUTES.PROFILE);
  };

  const toggleSearch = () => {
    setShowSearch((isVisible) => !isVisible);
  };

  return (
    <header className="header-container pd-1x pd-right-2x pd-left-2x">
      <section className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <Link to={"/"} className=" mg-left-1x pointer logo-title no-deco">
          Companion
        </Link>
        <span
          className="mg-left-4x flex-center pointer"
          onClick={toggleThemeFunc}
        >
          {mode === "light" ? (
            <IoMoon className="t3" color="gray" />
          ) : (
            <IoSunny className="t3" color="whitesmoke" />
          )}
        </span>
      </section>
      <section className="right-header-section">
        <IoSearchOutline
          className="search-icon-mobile"
          onClick={toggleSearch}
        />
        <SearchInput showSearch={showSearch} />
        <Button
          variant="outlined"
          size={"large"}
          onClick={() => {
            userLogout(dispatch);
          }}
          sx={{ borderRadius: 3, boxShadow: "none", height: "35px" }}
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
      </section>
    </header>
  );
};

export default Header;
