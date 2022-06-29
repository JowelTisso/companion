import "./Profile.css";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Link, Modal } from "@mui/material";
import UserPost from "../../components/userpost/UserPost";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../utils/Constant";
import { followUserCall } from "../../components/userpost/service/userService";
import {
  getMoreUserPosts,
  getUser,
  getUserPosts,
  toggleEditProfileModal,
} from "../../store/profileSlice";
import EditModal from "./component/EditModal";
import { BeatLoader } from "react-spinners";
import { Color } from "../../utils/Color";

const Profile = () => {
  const [sortedUserPost, setSortedUserPost] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
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
    isModalOpen,
    loadingMore,
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

  useEffect(() => {
    // To scroll window to top
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getUserPosts(username));
  }, [posts, username]);

  useEffect(() => {
    const sortedPosts = [...userPosts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortedUserPost(sortedPosts);
  }, [userPosts]);

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
              border: `2px solid ${Color.border}`,
              color: Color.border,
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
            href={website}
            underline="none"
            color={Color.secondary}
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
          {sortedUserPost?.length > 0 ? (
            sortedUserPost?.map((post) => (
              <UserPost {...post} key={post._id} user={user} />
            ))
          ) : (
            <p className="t4">You have not created any post!</p>
          )}
          <div className="flex-center">
            {loadingMore && (
              <BeatLoader color={Color.primary} loading={true} size={20} />
            )}
          </div>
        </main>
      </section>

      <Modal open={isModalOpen} onClose={handleClose}>
        <main className={`profile-modal-content flex-center`}>
          <EditModal />
        </main>
      </Modal>
    </div>
  );
};

export default Profile;
