import "./Comment.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, ListItemButton } from "@mui/material";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { usePopover } from "../../../components/popmenu/PopMenu";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  toggleModal,
  updateSelectedComment,
} from "../../../store/commentSlice";

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

  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const editCommentHandler = () => {
    dispatch(updateSelectedComment({ comment: comment }));
    dispatch(toggleModal());
    handleClosePopover();
  };

  const deleteCommentHandler = () => {
    dispatch(deleteComment({ postId, _id }));
    handleClosePopover();
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
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={commentUser?.avatar}
          alt="profile avatar"
        />
        <div className="pd-left-2x">
          <p className="t4 username">
            {commentUser?.firstName} {commentUser?.lastName}
          </p>
          <p className="post-time">
            @{commentUser?.username} . {month} {date}
          </p>
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
        <p className="t4 post-txt">{content}</p>
      </section>
    </div>
  );
};

export default Comment;
