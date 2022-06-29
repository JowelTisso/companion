import "./CreatePost.css";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Badge } from "@mui/material";
import {
  createPost,
  editPost,
  loadMoreExplorePostsUpto,
  setLoading,
} from "../../store/postSlice";
import { callToast } from "../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, updateEditPostData } from "../../store/homeSlice";
import { IoImageOutline, IoCloseCircle } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { ROUTES } from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import { getUserPosts } from "../../store/profileSlice";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { Modal } from "@mui/material";
import { uploadImages } from "../../pages/profile/component/service";
import { Color } from "../../utils/Color";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isEditModal, content, images, postId } = useSelector(
    (state) => state.home.editPostData
  );
  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);
  const { mode } = useSelector((state) => state.theme);
  const { currentPageNumber } = useSelector((state) => state.post);

  const [postData, setPostData] = useState({
    content: isEditModal ? content : "",
    images: isEditModal ? images : null,
    userId: user._id,
    avatar: user.avatar,
  });

  const [postImg, setPostImg] = useState({
    img: isEditModal ? images : "",
    files: null,
  });
  const [emojiModal, setEmojiModal] = useState(false);

  const location = useLocation();
  const fileInputRef = useRef(null);

  const onChangeHandler = ({ target }) => {
    setPostData((state) => ({ ...state, content: target.value }));
  };

  const pickImg = ({ target }) => {
    const img = URL.createObjectURL(target.files[0]);
    setPostImg((imgObj) => ({ ...imgObj, img: img, files: target.files }));
  };

  const clearImg = () => {
    URL.revokeObjectURL(postImg);
    fileInputRef.current.value = "";
    setPostImg({ img: "", files: null });
    setPostData((state) => ({ ...state, images: null }));
  };

  const uploadHandler = async () => {
    try {
      if (postImg.files) {
        const res = await uploadImages(postImg.files);
        return res?.url;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  };

  const postHandler = async () => {
    if (postData.content) {
      if (isEditModal) {
        setLoading();
        const imgUrl = await uploadHandler();
        dispatch(
          editPost({
            postId,
            postData: { ...postData, images: imgUrl ? [imgUrl] : postImg.img },
          })
        );
        dispatch(toggleModal());
        dispatch(
          updateEditPostData({
            isEditModal: false,
            content: "",
            images: null,
            isBookmarked: false,
          })
        );
        if (location.pathname === ROUTES.EXPLORE) {
          dispatch(loadMoreExplorePostsUpto(currentPageNumber));
        }
      } else {
        setLoading();
        const imgUrl = await uploadHandler();
        dispatch(createPost({ ...postData, images: imgUrl ? [imgUrl] : null }));
        dispatch(toggleModal({ isOpen: false }));
        setPostData((state) => ({ ...state, content: "", images: null }));
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

  const onEmojiClick = (emojiObject) => {
    setPostData((state) => ({
      ...state,
      content: state.content + emojiObject.native,
    }));
  };

  const EmojiPicker = (props) => {
    const ref = useRef();

    useEffect(() => {
      new Picker({ ...props, data, ref });
    }, []);

    return <div ref={ref} />;
  };

  const toggleEmojiModal = () => {
    setEmojiModal((state) => !state);
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
        {postImg.img && (
          <Badge
            badgeContent={
              <IoCloseCircle
                size={21}
                color={Color.primary}
                className="pointer"
                onClick={clearImg}
              />
            }
          >
            <img src={postImg.img} alt="post" className="new-post-img" />
          </Badge>
        )}

        <section className="post-actions-container">
          <span className="post-icon-container pd-left-3x">
            <span>
              <label htmlFor="profilePic">
                <IoImageOutline className="t3 post-icon pointer" />
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={false}
                className="file-chooser"
                id="profilePic"
                onChange={pickImg}
              />
            </span>
            <AiOutlineFileGif className="t3 post-icon pointer" />
            <MdOutlineEmojiEmotions
              className="t3 post-icon pointer"
              onClick={toggleEmojiModal}
            />
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
      <Modal open={emojiModal} onClose={toggleEmojiModal}>
        <main className={`emoji-container flex-center`}>
          <EmojiPicker onEmojiSelect={onEmojiClick} />
        </main>
      </Modal>
    </div>
  );
};

export default CreatePost;
