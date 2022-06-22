import "./NewComment.css";
import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  editComment,
  loadCommentPost,
  toggleModal,
} from "../../../store/commentSlice";
import { useParams } from "react-router-dom";
import { loadPosts } from "../../../store/postSlice";

const NewComment = ({ edit = false, selectedComment = {} }) => {
  const [commentData, setCommentData] = useState(
    edit ? selectedComment.content : ""
  );
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { postId } = useParams();

  const onChangeHandler = ({ target }) => {
    setCommentData(target.value);
  };

  const replyHandler = () => {
    if (commentData) {
      if (edit) {
        dispatch(
          editComment({
            postId,
            selectedCommentId: selectedComment._id,
            commentData: { content: commentData },
          })
        );
        dispatch(toggleModal());
      } else {
        dispatch(addComment({ postId, commentData: { content: commentData } }));
      }
      dispatch(loadCommentPost(postId));
      dispatch(loadPosts());
    }
  };

  return (
    <div
      className={`new-comment-card mg-top-2x pd-2x ${
        mode === "dark" && "container-darkmode"
      }`}
    >
      <Avatar
        sx={{ width: 50, height: 50 }}
        src={user.avatar}
        alt="profile avatar"
      />
      <div className="post-details">
        <textarea
          type="text"
          className={`post-input t4 ${mode === "dark" && "container-darkmode"}`}
          placeholder="What's in your mind?"
          value={commentData}
          onChange={onChangeHandler}
        />
        <section className="post-actions-container">
          <Button
            variant="contained"
            size={"medium"}
            onClick={replyHandler}
            sx={{ borderRadius: 2, boxShadow: "none" }}
          >
            {edit ? "Edit" : "Reply"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default NewComment;
