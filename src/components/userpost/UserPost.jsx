import "./UserPost.css";
import React from "react";
import { Avatar, IconButton, ListItemButton } from "@mui/material";
import {
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoChatboxOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../store/bookmarkSlice";
import { usePopover } from "../popmenu/PopMenu";
import { deletePost } from "../../store/postSlice";
import { callToast } from "../toast/Toast";

const UserPost = ({
  content,
  images,
  _id,
  createdAt,
  currentUsername,
  username,
  firstName,
  lastName,
}) => {
  const { bookmarks, bookmarkStatus, bookmarkError } = useSelector(
    (state) => state.bookmark
  );
  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  const isLoading = bookmarkStatus === "loading";

  const isBookmarked =
    bookmarks.length > 0 ? bookmarks?.some((post) => post._id === _id) : false;

  const bookmarkHandler = () => {
    if (!isBookmarked) {
      dispatch(addBookmark(_id));
    } else {
      dispatch(removeBookmark(_id));
    }
  };

  const deletePostHandler = () => {
    if (username === currentUsername) {
      dispatch(deletePost(_id));
    } else {
      callToast("You are not authorized to delete this post!", false);
    }
  };

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
            <ListItemButton onClick={() => console.log("edit")}>
              <p className="post-menu-option">EDIT</p>
            </ListItemButton>
            <ListItemButton onClick={deletePostHandler}>
              <p className="post-menu-option">DELETE</p>
            </ListItemButton>
          </PopMenuWrapper>
        </span>
      </section>
      <section className="post-content mg-top-2x">
        <p className="t4 post-txt">{content}</p>
        <main className="post-img-container mg-top-2x">
          {images &&
            images.map((img, id) => (
              <img key={id} src={img} alt="post image" className="post-img" />
            ))}
        </main>
        <span className="post-icon-user-container mg-top-2x">
          <IconButton aria-label="like the post">
            <IoHeartOutline className="t3 post-icon pointer" />
          </IconButton>
          <IconButton aria-label="add comment">
            <IoChatboxOutline className="t3 post-icon pointer" />
          </IconButton>
          <IconButton aria-label="share the post">
            <IoShareSocialOutline className="t3 post-icon pointer" />
          </IconButton>
          <IconButton
            aria-label="add to bookmark"
            onClick={bookmarkHandler}
            disabled={isLoading}
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
