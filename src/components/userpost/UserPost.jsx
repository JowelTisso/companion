import "./UserPost.css";
import React, { useEffect } from "react";
import { Avatar, IconButton, ListItemButton } from "@mui/material";
import {
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoChatboxOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../store/bookmarkSlice";
import { usePopover } from "../popmenu/PopMenu";
import { deletePost, dislikePost, likePost } from "../../store/postSlice";
import { callToast } from "../toast/Toast";
import { toggleModal, updateEditPostData } from "../../store/homeSlice";
import { API } from "../../utils/Constant";
import { followUserCall } from "./service/userService";

const UserPost = ({
  content,
  images,
  _id: postId,
  createdAt,
  username,
  firstName,
  lastName,
  likes,
  userId,
  user,
}) => {
  const { bookmarks, bookmarkStatus } = useSelector((state) => state.bookmark);
  const { likeStatus } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  const isBookmarking = bookmarkStatus === "loading";
  const isLiking = likeStatus === "loading";

  const isBookmarked =
    bookmarks?.length > 0
      ? bookmarks?.some((post) => post._id === postId)
      : false;

  const isLiked = likes.likedBy?.some(
    (likedUser) => likedUser.username === user.username
  );

  const isFollowing = user.following.some(
    (followedUser) => followedUser._id === userId
  );

  const bookmarkHandler = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(postId));
    } else {
      dispatch(addBookmark(postId));
    }
  };

  const deletePostHandler = () => {
    if (username === user.username) {
      dispatch(deletePost(postId));
      if (isBookmarked) {
        dispatch(removeBookmark(postId));
        dispatch(addBookmark(postId));
      }
    } else {
      callToast("You are not authorized to delete this post!", false);
    }
  };

  const editPostHandler = () => {
    if (username === user.username) {
      dispatch(toggleModal());
      dispatch(
        updateEditPostData({ isEditModal: true, content, postId: postId })
      );
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
      handleClosePopover();
    } else {
      callToast("You are not authorized to edit this post!", false);
    }
  };

  const likeHandler = async () => {
    if (isLiked) {
      dispatch(dislikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
    if (isBookmarked) {
      dispatch(removeBookmark(postId));
      dispatch(addBookmark(postId));
    }
  };

  const followHandler = async () => {
    if (isFollowing) {
      followUserCall(API.UNFOLLOW_USER, userId, dispatch);
    } else {
      followUserCall(API.FOLLOW_USER, userId, dispatch);
    }
    handleClosePopover();
  };

  useEffect(() => {
    // To the popup menu on scroll
    window.addEventListener("scroll", handleClosePopover);
    return () => window.removeEventListener("scroll", handleClosePopover);
  }, []);

  return (
    <div className="post-card-user pd-2x">
      <section className="item-user">
        <Avatar
          sx={{ borderRadius: 2, width: 40, height: 40 }}
          variant="rounded"
        >
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="profile avatar"
            className="avatar pointer"
          />
        </Avatar>
        <div className="pd-left-2x">
          <p className="t4 username">
            {firstName} {lastName}
          </p>
          <p className="post-time">
            @{username} . {month} {date}
          </p>
        </div>

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
              <>
                <ListItemButton onClick={editPostHandler}>
                  <p className="post-menu-option">EDIT</p>
                </ListItemButton>
                <ListItemButton onClick={deletePostHandler}>
                  <p className="post-menu-option">DELETE</p>
                </ListItemButton>
              </>
            ) : (
              <ListItemButton onClick={followHandler}>
                <p className="post-menu-option">
                  {isFollowing ? "Unfollow" : "Follow"}
                </p>
              </ListItemButton>
            )}
          </PopMenuWrapper>
        </span>
      </section>
      <section className="post-content mg-top-2x">
        <p className="t4 post-txt">{content}</p>
        <main className="post-img-container mg-top-2x">
          {images &&
            images?.map((img, id) => (
              <img key={id} src={img} alt="post image" className="post-img" />
            ))}
        </main>
        <span className="post-icon-user-container mg-top-2x">
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
            <p className="t4">{likes.likeCount}</p>
          </span>
          <span className="flex-center">
            <IconButton aria-label="add comment">
              <IoChatboxOutline className="t3 post-icon pointer" />
            </IconButton>
            <p className="t4">26</p>
          </span>
          <IconButton aria-label="share the post">
            <IoShareSocialOutline className="t3 post-icon pointer" />
          </IconButton>
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
