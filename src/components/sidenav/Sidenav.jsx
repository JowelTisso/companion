import "./Sidenav.css";
import React from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/homeSlice";
import { navList } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/Constant";
import { getUser, getUserPosts } from "../../store/profileSlice";
import { IoMdAdd } from "react-icons/io";

const Sidenav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const { user } = useSelector((state) => state.auth);

  const newPostHandler = () => {
    dispatch(toggleModal());
  };

  const goToProfile = (to) => {
    if (to === ROUTES.PROFILE) {
      dispatch(getUser(user._id));
      dispatch(getUserPosts(user.username));
    }
    navigate(to);
  };

  return (
    <aside className="sidenav flex-center pd-2x">
      <section className="nav-item item-user pd-2x">
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={user.avatar}
          alt="profile avatar"
          className=" pointer"
          onClick={() => goToProfile(ROUTES.PROFILE)}
        />
        <div className="nav-user-info pd-left-2x">
          <p className="t4 username txt-overflow">
            {user.firstName} {user.lastName}
          </p>
          <p className="t4 userid txt-overflow">@{user.username}</p>
        </div>
      </section>
      <nav className="nav-item pd-2x">
        <List className="list">
          {navList.map(({ name, icon, to }, i) => (
            <ListItem
              key={name}
              disablePadding
              className={`pd-top-1x ${i === 1 && "mg-right-5x"} ${
                i === 2 && "mg-left-5x"
              }`}
            >
              <ListItemButton
                className="list-item"
                sx={{
                  borderLeft:
                    currentRoute === to ? "2px solid #048434" : "none",
                }}
                onClick={() => goToProfile(to)}
              >
                <ListItemIcon className="nav-icon">
                  {icon(currentRoute)}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  className="nav-item-name"
                  primaryTypographyProps={{
                    fontSize: 16,
                    color: currentRoute === to ? "#048434" : "#bcbec1",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Button
        variant="contained"
        size={"large"}
        onClick={newPostHandler}
        className="sidenav-btn"
        sx={{ borderRadius: 3, boxShadow: "none" }}
      >
        <span className="create-post-txt">Create new post</span>
        <span>
          <IoMdAdd className="t2 create-post-icon" />
        </span>
      </Button>
    </aside>
  );
};

export default Sidenav;
