import "./CreatePost.css";
import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { createPost, editPost } from "../../store/postSlice";
import { callToast } from "../toast/Toast";
import { useSelector } from "react-redux";
import { toggleModal, updateEditPostData } from "../../store/homeSlice";

const CreatePost = ({ dispatch }) => {
  const { isEditModal, content, postId } = useSelector(
    (state) => state.home.editPostData
  );

  const [postData, setPostData] = useState({
    content: isEditModal ? content : "",
    images: null,
  });

  const onChangeHandler = ({ target }) => {
    setPostData((state) => ({ ...state, content: target.value }));
  };

  const postHandler = () => {
    if (postData.content) {
      if (isEditModal) {
        dispatch(editPost({ postId, postData }));
        dispatch(toggleModal());
        dispatch(updateEditPostData({ isEditModal: false, content: "" }));
      } else {
        dispatch(createPost(postData));
        dispatch(toggleModal({ isOpen: false }));
      }
    } else {
      callToast("Nothing to post!", false);
    }
  };

  return (
    <div className="post-card pd-2x">
      <Avatar sx={{ borderRadius: 2, width: 45, height: 45 }} variant="rounded">
        <img
          src="https://i.pravatar.cc/150?img=60"
          alt="profile avatar"
          className="avatar pointer"
        />
      </Avatar>
      <div className="post-details">
        <textarea
          type="text"
          className="post-input t4"
          placeholder="What's in your mind?"
          value={postData.content}
          onChange={onChangeHandler}
        />
        <section className="post-actions-container">
          <span className="post-icon-container pd-left-3x">
            <IoImageOutline className="t3 post-icon pointer" />
            <AiOutlineFileGif className="t3 post-icon pointer" />
            <MdOutlineEmojiEmotions className="t3 post-icon pointer" />
          </span>
          <Button
            variant="contained"
            size={"medium"}
            onClick={postHandler}
            sx={{ borderRadius: 2, boxShadow: "none" }}
          >
            Post
          </Button>
        </section>
      </div>
    </div>
  );
};

export default CreatePost;
