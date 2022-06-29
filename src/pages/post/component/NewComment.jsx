import "./NewComment.css";
import React, { useState, useRef, useEffect } from "react";
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
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { Modal } from "@mui/material";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const NewComment = ({ edit = false, selectedComment = {} }) => {
  const [commentData, setCommentData] = useState(
    edit ? selectedComment.content : ""
  );
  const [emojiModal, setEmojiModal] = useState(false);
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

  const toggleEmojiModal = () => {
    setEmojiModal((state) => !state);
  };

  const onEmojiClick = (emojiObject) => {
    setCommentData((comment) => comment + emojiObject.native);
  };

  const EmojiPicker = (props) => {
    const ref = useRef();

    useEffect(() => {
      new Picker({ ...props, data, ref });
    }, []);

    return <div ref={ref} />;
  };

  return (
    <div
      className={`new-comment-card mg-top-2x pd-2x ${
        mode === "dark" ? "container-darkmode" : "container-lightmode"
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
          <span className="post-icon-container pd-left-3x">
            <MdOutlineEmojiEmotions
              className="t3 post-icon pointer"
              onClick={toggleEmojiModal}
            />
          </span>
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
      <Modal open={emojiModal} onClose={toggleEmojiModal}>
        <main className={`emoji-container flex-center`}>
          <EmojiPicker onEmojiSelect={onEmojiClick} />
        </main>
      </Modal>
    </div>
  );
};

export default NewComment;
