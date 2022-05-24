import "./Profile.css";
import React, { useState } from "react";
import { Avatar, Button, Link, Modal } from "@mui/material";
import UserPost from "../../components/userpost/UserPost";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../utils/Constant";
import { followUserCall } from "../../components/userpost/service/userService";
import { getUser, toggleEditProfileModal } from "../../store/profileSlice";
import EditModal from "./component/EditModal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    userProfile: {
      avatar,
      firstName,
      lastName,
      username,
      followers,
      following,
      bio,
      website,
      backgroundImg,
      _id: userProfileId,
    },
    userPosts,
    status,
    isModalOpen,
  } = useSelector((state) => state.profile);

  const defaultBackgroundImg = "https://picsum.photos/id/10/1000/500";

  const dispatch = useDispatch();

  const followersCount = followers?.length;
  const followingCount = following?.length;

  const isFollowing = user.following.some(
    (followedUser) => followedUser._id === userProfileId
  );

  const profileBtnName = () => {
    if (user._id === userProfileId) {
      return "Edit profile";
    }
    if (isFollowing) {
      return "Unfollow";
    } else {
      return "Follow";
    }
  };

  const followHandler = async () => {
    if (isFollowing) {
      followUserCall(API.UNFOLLOW_USER, userProfileId, dispatch);
    } else {
      followUserCall(API.FOLLOW_USER, userProfileId, dispatch);
    }
    dispatch(getUser(userProfileId));
  };

  const editProfileHandler = () => {
    dispatch(toggleEditProfileModal());
  };

  const profileBtnHandler = () => {
    if (user._id === userProfileId) {
      editProfileHandler();
    } else {
      followHandler();
    }
  };

  const handleClose = () => {
    dispatch(toggleEditProfileModal());
  };

  return (
    <div className="home-wrapper">
      <main className="user-info-section">
        <div
          className="profile-banner mg-top-1x"
          style={{
            backgroundImage: `url(${backgroundImg || defaultBackgroundImg})`,
          }}
        >
          <span className="profile-img ">
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={avatar}
              alt="profile avatar"
            />
          </span>
        </div>

        <div className="edit-btn mg-1x">
          <Button
            variant="outlined"
            sx={{
              border: "2px solid #424b54",
              color: "#424b54",
              borderRadius: 5,
            }}
            onClick={profileBtnHandler}
          >
            {profileBtnName()}
          </Button>
        </div>

        <div className="mg-top-5x mg-left-2x user-info">
          <p className="t3 username">
            {firstName} {lastName}
          </p>
          <p className="t3 userid">@{username}</p>
        </div>

        <p className="t4 mg-left-2x mg-top-1x">{bio}</p>
        <span className="mg-left-2x website-link">
          <Link
            href="https://github.com/JowelTisso"
            underline="none"
            color="#2196f3"
            fontSize={14}
            target="_blank"
          >
            {website}
          </Link>
        </span>

        <div className="follower-container mg-left-2x mg-top-2x">
          <p className="t4">
            <b className="follower-count">{followersCount}</b> Followers
          </p>
          <p className="t4">
            <b className="follower-count">{followingCount}</b> Following
          </p>
        </div>
      </main>

      <section className="user-posts-section pd-1x">
        <p className="t3 section-title mg-left-1x mg-top-2x">Your posts</p>
        <main className="userpost mg-top-2x">
          {userPosts?.length > 0 ? (
            userPosts?.map((post) => (
              <UserPost {...post} key={post._id} user={user} />
            ))
          ) : (
            <p className="t4">You have not created any post!</p>
          )}
        </main>
      </section>

      <Modal open={isModalOpen} onClose={handleClose}>
        <main className="profile-modal-content flex-center">
          <EditModal />
        </main>
      </Modal>
    </div>
  );
};

export default Profile;
