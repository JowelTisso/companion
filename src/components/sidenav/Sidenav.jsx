import "./Sidenav.css";
import React from "react";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  TiHomeOutline,
  TiContacts,
  TiImageOutline,
  TiClipboard,
  TiUserOutline,
  TiCogOutline,
} from "react-icons/ti";

const Sidenav = () => {
  const navList = [
    {
      name: "Home",
      to: "/",
      icon: () => <TiHomeOutline className="t3 nav-icon" />,
    },
    {
      name: "People",
      to: "/",
      icon: () => <TiContacts className="t3 nav-icon" />,
    },
    {
      name: "Photo",
      to: "/",
      icon: () => <TiImageOutline className="t3 nav-icon" />,
    },
    {
      name: "Feed",
      to: "/",
      icon: () => <TiClipboard className="t3 nav-icon" />,
    },
    {
      name: "Profile",
      to: "/",
      icon: () => <TiUserOutline className="t3 nav-icon" />,
    },
    {
      name: "Setting",
      to: "/",
      icon: () => <TiCogOutline className="t3 nav-icon" />,
    },
  ];

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
          <p className="t4 username">Jowel Tisso</p>
          <p className="t4 userid">@joweltisso</p>
        </div>
      </section>
      <nav className="nav-item pd-2x">
        <List>
          {navList.map(({ name, icon }) => (
            <ListItem disablePadding className="pd-top-1x">
              <ListItemButton>
                <ListItemIcon>{icon()}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </aside>
  );
};

export default Sidenav;
