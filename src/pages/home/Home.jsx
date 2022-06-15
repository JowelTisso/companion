import "./Home.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import CreatePost from "../../components/post/CreatePost";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { loadMorePosts, updatePosts } from "../../store/postSlice";
import Spinner from "../../components/spinner/Spinner";
import { IoOptionsOutline } from "react-icons/io5";
import { IconButton, ListItemButton } from "@mui/material";
import { usePopover } from "../../components/popmenu/PopMenu";
import BeatLoader from "react-spinners/BeatLoader";

const Home = () => {
  const { posts, status, currentPageNumber, hasMore, loadingMore } =
    useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();
  const nextPage = currentPageNumber + 1;
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (hasMore) {
              dispatch(loadMorePosts(nextPage));
            }
          }
        },
        {
          threshold: 1,
          rootMargin: "-50px",
        }
      );

      node && observer.current.observe(node);
    },
    [nextPage, hasMore, loadingMore]
  );

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

      <section className="userpost mg-top-1x mg-bottom-5x">
        {posts &&
          posts?.map((post, i) =>
            posts.length === i + 1 ? (
              <UserPost
                ref={lastPostRef}
                {...post}
                key={post._id}
                user={user}
              />
            ) : (
              <UserPost {...post} key={post._id} user={user} />
            )
          )}
        {loadingMore && (
          <div className="flex-center">
            <BeatLoader color="#048434" loading={true} size={20} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
