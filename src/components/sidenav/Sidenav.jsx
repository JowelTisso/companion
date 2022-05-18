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

import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/homeSlice";

import { navList } from "./data";
import { useLocation, useNavigate } from "react-router-dom";

const Sidenav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const newPostHandler = () => {
    dispatch(toggleModal());
  };

  return (
    <aside className="sidenav flex-center pd-2x">
      <section className="nav-item item-user pd-2x">
        <Avatar
          sx={{ borderRadius: 2, width: 45, height: 45 }}
          variant="rounded"
        >
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="profile avatar"
            className="avatar pointer"
          />
        </Avatar>
        <div className="pd-left-2x">
          <p className="t4 username txt-overflow">Jowel Tisso</p>
          <p className="t4 userid txt-overflow">@joweltisso</p>
        </div>
      </section>
      <nav className="nav-item pd-2x">
        <List>
          {navList.map(({ name, icon, to }) => (
            <ListItem key={name} disablePadding className="pd-top-1x">
              <ListItemButton
                sx={{
                  borderLeft:
                    currentRoute === to ? "2px solid #048434" : "none",
                }}
                onClick={() => navigate(to)}
              >
                <ListItemIcon>{icon(currentRoute)}</ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    fontSize: 16,
                    color: currentRoute === to ? "#048434" : "gray",
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
        sx={{ borderRadius: 3, boxShadow: "none" }}
      >
        Create new post
      </Button>
    </aside>
  );
};

export default Sidenav;
