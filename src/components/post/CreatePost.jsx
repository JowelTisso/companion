import "./CreatePost.css";
import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
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
  const { mode } = useSelector((state) => state.theme);

  const [postData, setPostData] = useState({
    content: isEditModal ? content : "",
    images: null,
    userId: user._id,
    avatar: user.avatar,
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
          dispatch(addBookmark({ postId, bookmarkUserId: user._id }));
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
    <div
      className={`post-card pd-2x ${
        mode === "dark" ? "container-darkmode" : "post-card-light"
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
          value={postData.content}
          onChange={onChangeHandler}
        />
        <section className="post-actions-container">
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
