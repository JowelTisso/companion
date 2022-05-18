import "./Home.css";
import React, { useEffect } from "react";
import CreatePost from "../../components/post/CreatePost";
import UserPost from "../../components/userpost/UserPost";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, updateEditPostData } from "../../store/homeSlice";
import { loadPosts, updatePosts } from "../../store/postSlice";
import Spinner from "../../components/spinner/Spinner";
import { IoOptionsOutline } from "react-icons/io5";
import { IconButton, ListItemButton } from "@mui/material";
import { usePopover } from "../../components/popmenu/PopMenu";

const Home = () => {
  const { posts, status } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { isModal } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [dispatch, status]);

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(updateEditPostData({ isEditModal: false, content: "" }));
  };

  const sortByDate = (posts) => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
    handleClosePopover();
  };

  const sortByLikes = (posts) => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.likes.likeCount) - new Date(a.likes.likeCount);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
    handleClosePopover();
  };

  if (status === "loading") {
    return <Spinner loading={true} />;
  }
  return (
    <div className="home-wrapper">
      <CreatePost dispatch={dispatch} />

      <div className="filter-container mg-top-3x">
        <IconButton aria-describedby={id} onClick={openPopover}>
          <IoOptionsOutline className="t3 filter-icon" />
        </IconButton>
        <PopMenuWrapper>
          <ListItemButton onClick={() => sortByDate(posts)}>
            <p className="filter-option">Sort by date</p>
          </ListItemButton>
          <ListItemButton onClick={() => sortByLikes(posts)}>
            <p className="filter-option">Sort by trending</p>
          </ListItemButton>
        </PopMenuWrapper>
      </div>

      <section className="userpost mg-top-1x">
        {posts &&
          posts?.map((post) => (
            <UserPost
              {...post}
              key={post._id}
              currentUsername={user.username}
            />
          ))}
      </section>
      <Modal open={isModal} onClose={handleClose}>
        <main className="modal-content flex-center">
          <CreatePost dispatch={dispatch} />
        </main>
      </Modal>
    </div>
  );
};

export default Home;
