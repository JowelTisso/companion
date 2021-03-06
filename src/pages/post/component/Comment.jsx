import "./Comment.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, ListItemButton, Skeleton } from "@mui/material";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { usePopover } from "../../../components/popmenu/PopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  loadCommentPost,
  toggleModal,
  updateSelectedComment,
} from "../../../store/commentSlice";
import { loadPosts } from "../../../store/postSlice";

const Comment = ({
  firstName,
  lastName,
  username,
  content,
  createdAt,
  avatar,
  user,
  _id,
  postId,
  comment,
  allUsers,
}) => {
  const [commentUser, setCommentUser] = useState({});
  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  const { status } = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const editCommentHandler = () => {
    handleClosePopover();
    dispatch(updateSelectedComment({ comment: comment }));
    dispatch(toggleModal());
  };

  const deleteCommentHandler = () => {
    handleClosePopover();
    dispatch(deleteComment({ postId, _id }));
    dispatch(loadPosts());
    dispatch(loadCommentPost(postId));
  };

  useEffect(() => {
    // To get post user data
    (() => {
      const user = allUsers.find((user) => user.username === username);
      setCommentUser(user);
    })();
  }, [allUsers]);

  return (
    <div className="comment-card mg-top-2x pd-2x">
      <section className="item-user">
        {status === "loading" ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />
        ) : (
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={commentUser?.avatar}
            alt="profile avatar"
          />
        )}
        <div className="pd-left-2x">
          {status === "loading" ? (
            <Skeleton animation="wave" variant="text" height={20} width={100} />
          ) : (
            <p className="t4 username">
              {commentUser?.firstName} {commentUser?.lastName}
            </p>
          )}
          {status === "loading" ? (
            <Skeleton animation="wave" variant="text" height={20} width={100} />
          ) : (
            <p className="post-time">
              @{commentUser?.username} . {month} {date}
            </p>
          )}
        </div>
        {user.username === username && (
          <span className="post-menu">
            <IconButton
              aria-describedby={id}
              onClick={openPopover}
              sx={{ padding: "3px" }}
            >
              <IoEllipsisHorizontal className="t3" />
            </IconButton>
            <PopMenuWrapper>
              <ul className="popup-item">
                <ListItemButton onClick={editCommentHandler}>
                  <p className="post-menu-option">EDIT</p>
                </ListItemButton>
                <ListItemButton onClick={deleteCommentHandler}>
                  <p className="post-menu-option">DELETE</p>
                </ListItemButton>
              </ul>
            </PopMenuWrapper>
          </span>
        )}
      </section>
      <section className="post-content">
        {status === "loading" ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ height: 50 }}
          />
        ) : (
          <p className="t4 post-txt">{content}</p>
        )}
      </section>
    </div>
  );
};

export default Comment;
