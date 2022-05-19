import "./Home.css";
import React, { useEffect } from "react";
import CreatePost from "../../components/post/CreatePost";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "../../store/postSlice";
import Spinner from "../../components/spinner/Spinner";
import { IoOptionsOutline } from "react-icons/io5";
import { IconButton, ListItemButton } from "@mui/material";
import { usePopover } from "../../components/popmenu/PopMenu";

const Home = () => {
  const { posts, status } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const sortByDate = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
    handleClosePopover();
  };

  const sortByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.likes.likeCount) - new Date(a.likes.likeCount);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
    handleClosePopover();
  };

  useEffect(() => {
    // To the popup menu on scroll
    window.addEventListener("scroll", handleClosePopover);
    return () => window.removeEventListener("scroll", handleClosePopover);
  }, []);

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
          <ListItemButton onClick={sortByDate}>
            <p className="filter-option">Sort by date</p>
          </ListItemButton>
          <ListItemButton onClick={sortByLikes}>
            <p className="filter-option">Sort by trending</p>
          </ListItemButton>
        </PopMenuWrapper>
      </div>

      <section className="userpost mg-top-1x">
        {posts &&
          posts?.map((post) => (
            <UserPost {...post} key={post._id} user={user} />
          ))}
      </section>
    </div>
  );
};

export default Home;
