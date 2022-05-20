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
import { addBookmark, removeBookmark } from "../../store/bookmarkSlice";
import { ROUTES } from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import { getUserPosts } from "../../store/profileSlice";

const CreatePost = ({ dispatch }) => {
  const { isEditModal, content, postId, isBookmarked } = useSelector(
    (state) => state.home.editPostData
  );

  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);

  const [postData, setPostData] = useState({
    content: isEditModal ? content : "",
    images: null,
    userId: user._id,
  });

  const location = useLocation();

  const onChangeHandler = ({ target }) => {
    setPostData((state) => ({ ...state, content: target.value }));
  };

  const postHandler = () => {
    if (postData.content) {
      if (isEditModal) {
        dispatch(editPost({ postId, postData }));
        if (isBookmarked) {
          dispatch(removeBookmark(postId));
          dispatch(addBookmark(postId));
        }
        dispatch(toggleModal());
        dispatch(
          updateEditPostData({
            isEditModal: false,
            content: "",
            isBookmarked: false,
          })
        );
      } else {
        dispatch(createPost(postData));
        dispatch(toggleModal({ isOpen: false }));
      }

      if (
        location.pathname === ROUTES.PROFILE &&
        userProfile._id === user._id
      ) {
        dispatch(getUserPosts(userProfile.username));
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
