import "./Rightnav.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { BsDot } from "react-icons/bs";
import { API, ROUTES } from "../../utils/Constant";
import { followUserCall } from "../userpost/service/userService";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserPosts } from "../../store/profileSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Rightnav = () => {
  const { user: activeUser } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.home);
  const { userProfile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const notificationNames = ["Goku", "vegeta", "kakashi", "yu zhong"];

  const UserItem = ({ firstName, lastName, username, avatar, _id: userId }) => {
    const isFollowing = activeUser?.following.some(
      (followedUser) => followedUser._id === userId
    );

    const followHandler = async () => {
      if (isFollowing) {
        followUserCall(API.UNFOLLOW_USER, userId, dispatch);
      } else {
        followUserCall(API.FOLLOW_USER, userId, dispatch);
      }
      if (location.pathname === ROUTES.PROFILE) {
        dispatch(getUser(userProfile._id));
      }
    };

    const goToProfile = () => {
      dispatch(getUser(userId));
      dispatch(getUserPosts(username));
      navigate(ROUTES.PROFILE);
    };

    return (
      <main className="item-user pd-2x">
        <section className="item-user-info">
          <Avatar
            sx={{ width: 45, height: 45 }}
            src={avatar}
            alt="profile avatar"
            className=" pointer"
            onClick={goToProfile}
          />
          <div className="user-info-container pd-left-2x">
            <p className="t4 username txt-overflow">
              {firstName} {lastName}
            </p>
            <p className="t4 userid txt-overflow">@{username}</p>
          </div>
        </section>
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

  return (
    <aside className="rightnav flex-center pd-2x">
      <p className="t4 section-title"> Suggestions</p>
      <section className="nav-item suggestions">
        {allUsers?.map(
          (user) =>
            activeUser._id !== user._id && <UserItem {...user} key={user._id} />
        )}
      </section>
    </aside>
  );
};

export default Rightnav;
