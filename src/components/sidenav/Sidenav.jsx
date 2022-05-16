import "./Sidenav.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/homeSlice";

import { navList } from "./data";

const Sidenav = () => {
  const dispatch = useDispatch();

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
          {navList.map(({ name, icon }) => (
            <ListItem key={name} disablePadding className="pd-top-1x">
              <ListItemButton>
                <ListItemIcon>{icon()}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Button
        variant="contained"
        size={"large"}
        onClick={() => dispatch(toggleModal())}
        sx={{ borderRadius: 3, boxShadow: "none" }}
      >
        Create new post
      </Button>
    </aside>
  );
};

export default Sidenav;
