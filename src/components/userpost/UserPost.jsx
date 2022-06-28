import "./UserPost.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, ListItemButton } from "@mui/material";
import {
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoChatboxOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../store/bookmarkSlice";
import { usePopover } from "../popmenu/PopMenu";
import {
  deletePost,
  dislikePost,
  likePost,
  loadPosts,
} from "../../store/postSlice";
import { callToast } from "../toast/Toast";
import { toggleModal, updateEditPostData } from "../../store/homeSlice";
import { API, ROUTES } from "../../utils/Constant";
import { followUserCall } from "./service/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, getUserPosts } from "../../store/profileSlice";
import { loadCommentPost } from "../../store/commentSlice";

const UserPost = ({
  content,
  images,
  _id: postId,
  createdAt,
  username,
  likes,
  userId,
  user,
  comments,
}) => {
  const [postUser, setPostUser] = useState({});

  const { allBookmarks, bookmarkStatus } = useSelector(
    (state) => state.bookmark
  );
  const { likeStatus, posts } = useSelector((state) => state.post);
  const { userProfile } = useSelector((state) => state.profile);
  const { allUsers } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const location = useLocation();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();
  const navigate = useNavigate();

  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  const isBookmarking = bookmarkStatus === "loading";
  const isLiking = likeStatus === "loading";
  const isBookmarked =
    allBookmarks?.length > 0
      ? allBookmarks?.some(
          (post) => post._id === postId && post.bookmarkUserId === user._id
        )
      : false;

  const foundPost = posts?.find((post) => post._id === postId);

  const isLiked =
    location.pathname === "/bookmark"
      ? foundPost?.likes.likedBy?.some(
          (likedUser) => likedUser.username === user.username
        )
      : likes.likedBy?.some(
          (likedUser) => likedUser.username === user.username
        );

  const likeCount =
    location.pathname === "/bookmark"
      ? foundPost?.likes.likeCount
      : likes.likeCount;

  const commentCount =
    location.pathname === "/bookmark"
      ? foundPost?.comments.length
      : comments.length;

  const isFollowing = user.following?.some(
    (followedUser) => followedUser._id === userId
  );

  const bookmarkHandler = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(postId));
    } else {
      dispatch(addBookmark({ postId, bookmarkUserId: user._id }));
    }
  };

  const deletePostHandler = () => {
    if (username === user.username) {
      dispatch(deletePost(postId));
      if (isBookmarked) {
        dispatch(removeBookmark(postId));
      }
      if (
        location.pathname === ROUTES.PROFILE &&
        userProfile._id === user._id
      ) {
        dispatch(getUserPosts(userProfile.username));
      }
    } else {
      callToast("You are not authorized to delete this post!", false);
    }
    handleClosePopover();
  };

  const editPostHandler = () => {
    if (username === user.username) {
      dispatch(toggleModal());
      if (isBookmarked) {
        dispatch(
          updateEditPostData({
            isEditModal: true,
            content,
            postId: postId,
            isBookmarked: true,
          })
        );
      } else {
        dispatch(
          updateEditPostData({
            isEditModal: true,
            content,
            postId: postId,
            isBookmarked: false,
          })
        );
      }
    } else {
      callToast("You are not authorized to edit this post!", false);
    }
    handleClosePopover();
  };

  const likeHandler = async () => {
    if (isLiked) {
      dispatch(dislikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
    if (location.pathname.includes("/post")) {
      dispatch(loadCommentPost(postId));
    }
  };

  const followHandler = async () => {
    if (isFollowing) {
      followUserCall(API.UNFOLLOW_USER, userId, dispatch);
    } else {
      followUserCall(API.FOLLOW_USER, userId, dispatch);
    }
    dispatch(loadPosts());
    handleClosePopover();
  };

  const navigateToPost = () => {
    navigate(`${ROUTES.POST}/${postId}`);
  };

  const goToProfile = () => {
    dispatch(getUser(userId));
    navigate(ROUTES.PROFILE);
  };

  useEffect(() => {
    // To get post user data
    (() => {
      const user = allUsers.find((user) => user._id === userId);
      setPostUser(user);
    })();
  }, [allUsers, userId]);

  useEffect(() => {
    // To close the popup menu on scroll
    window.addEventListener("scroll", handleClosePopover);
    return () => window.removeEventListener("scroll", handleClosePopover);
  }, []);

  return (
    <div className="post-card-user pd-2x">
      <section className="item-user">
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={postUser?.avatar}
          alt="profile avatar"
          className="pointer"
          onClick={goToProfile}
        />
        <div className="pd-left-2x">
          <p className="t4 username pointer" onClick={goToProfile}>
            {postUser?.firstName} {postUser?.lastName}
          </p>
          <p className="post-time">
            @{postUser?.username} . {month} {date}
          </p>
        </div>

        {!location.pathname.includes("/post") && (
          <span className="post-menu">
            <IconButton
              aria-describedby={id}
              onClick={openPopover}
              sx={{ padding: "3px" }}
            >
              <IoEllipsisHorizontal className="t3" />
            </IconButton>
            <PopMenuWrapper>
              {user.username === username ? (
                <ul className="popup-item">
                  <ListItemButton onClick={editPostHandler}>
                    <p className="post-menu-option">EDIT</p>
                  </ListItemButton>
                  <ListItemButton onClick={deletePostHandler}>
                    <p className="post-menu-option">DELETE</p>
                  </ListItemButton>
                </ul>
              ) : (
                <ul className="popup-item">
                  <ListItemButton onClick={followHandler}>
                    <p className="post-menu-option">
                      {isFollowing ? "Unfollow" : "Follow"}
                    </p>
                  </ListItemButton>
                </ul>
              )}
            </PopMenuWrapper>
          </span>
        )}
      </section>
      <section className="post-content mg-top-2x">
        <p className="t4 post-txt">{content}</p>
        <main className="post-img-container mg-top-2x">
          {images &&
            images?.map((img, id) => (
              <img key={id} src={img} alt="post" className="post-img" />
            ))}
        </main>
        <span className="post-icon-user-container mg-top-2x">
          <span className="flex-gap">
            <span className="flex-center">
              <IconButton
                aria-label="like the post"
                onClick={likeHandler}
                disabled={isLiking}
              >
                {isLiked ? (
                  <IoHeart className="t3 post-icon pointer" color="#f14b4b" />
                ) : (
                  <IoHeartOutline className="t3 post-icon pointer" />
                )}
              </IconButton>
              <p className="t4">{likeCount || 0}</p>
            </span>
            <span className="flex-center">
              <IconButton aria-label="add comment" onClick={navigateToPost}>
                <IoChatboxOutline className="t3 post-icon pointer" />
              </IconButton>
              <p className="t4">{commentCount}</p>
            </span>
          </span>

          <IconButton
            aria-label="add to bookmark"
            onClick={bookmarkHandler}
            disabled={isBookmarking}
          >
            {isBookmarked ? (
              <IoBookmark className="t3 post-icon pointer" />
            ) : (
              <IoBookmarkOutline className="t3 post-icon pointer" />
            )}
          </IconButton>
        </span>
      </section>
    </div>
  );
};

export default UserPost;
