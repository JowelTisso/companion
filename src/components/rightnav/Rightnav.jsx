import "./Rightnav.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { BsDot } from "react-icons/bs";

const Rightnav = () => {
  const users = [
    {
      _id: 1,
      firstName: "Jowel",
      lastName: "Tisso",
      username: "joweltisso",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
    {
      _id: 2,
      firstName: "Goku",
      lastName: "Senkai",
      username: "gokusenkai",
      avatar: "https://i.pravatar.cc/150?img=54",
    },
    {
      _id: 3,
      firstName: "Vegeta",
      lastName: "borgo",
      username: "vegetaborgo",
      avatar: "https://i.pravatar.cc/150?img=40",
    },
    {
      _id: 4,
      firstName: "Kakashi",
      lastName: "vengkata",
      username: "kakashivengkata",
      avatar: "https://i.pravatar.cc/150?img=31",
    },
  ];

  return (
    <aside className="rightnav flex-center pd-2x">
      <p className="t4 section-title"> Suggestions</p>
      <section className="nav-item right-nav">
        {users.map(({ firstName, lastName, username, avatar }) => (
          <main className="item-user pd-2x">
            <Avatar
              sx={{ borderRadius: 2, width: 45, height: 45 }}
              variant="rounded"
            >
              <img
                src={avatar}
                alt="profile avatar"
                className="avatar pointer"
              />
            </Avatar>
            <div className="pd-left-2x">
              <p className="t4 username txt-overflow">
                {firstName} {lastName}
              </p>
              <p className="t4 userid txt-overflow">@{username}</p>
            </div>
            <div className="follow-btn-container flex-center">
              <Button
                variant="contained"
                size={"small"}
                onClick={() => {}}
                sx={{
                  borderRadius: 5,
                  boxShadow: "none",
                  backgroundColor: "dimgrey",
                }}
              >
                Follow
              </Button>
            </div>
          </main>
        ))}
      </section>
      <p className="t4 section-title"> Notifications</p>
      <section className="notification-container">
        <p className="t4 notification-content nav-item pd-2x">
          <BsDot /> Goku started following you
        </p>
        <p className="t4 notification-content nav-item pd-2x mg-top-1x">
          <BsDot /> Vegeta started following you
        </p>
        <p className="t4 notification-content nav-item pd-2x mg-top-1x">
          <BsDot /> Kakashi started following you
        </p>
      </section>
    </aside>
  );
};

export default Rightnav;
