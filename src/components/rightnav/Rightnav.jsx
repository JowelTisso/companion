import "./Rightnav.css";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { BsDot } from "react-icons/bs";
import { GET } from "../../utils/axiosHelper";
import { API } from "../../utils/Constant";
import { followUserCall } from "../userpost/service/userService";
import { useDispatch, useSelector } from "react-redux";

const Rightnav = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const UserItem = ({ firstName, lastName, username, avatar, _id: userId }) => {
    const isFollowing = user.following.some(
      (followedUser) => followedUser._id === userId
    );

    const followHandler = async () => {
      if (isFollowing) {
        followUserCall(API.UNFOLLOW_USER, userId, dispatch);
      } else {
        followUserCall(API.FOLLOW_USER, userId, dispatch);
      }
    };
    return (
      <main className="item-user pd-2x">
        <Avatar
          sx={{ borderRadius: 2, width: 45, height: 45 }}
          variant="rounded"
        >
          <img src={avatar} alt="profile avatar" className="avatar pointer" />
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
            onClick={followHandler}
            sx={{
              borderRadius: 5,
              boxShadow: "none",
              backgroundColor: "dimgrey",
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </main>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await GET(API.ALL_USER, {});
        if (res?.status === 200 || res?.status === 201) {
          setUsers(res?.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <aside className="rightnav flex-center pd-2x">
      <p className="t4 section-title"> Suggestions</p>
      <section className="nav-item suggestions">
        {users?.map((user) => (
          <>
            <UserItem {...user} key={user._id} />
          </>
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
