import "./Home.css";
import React, { useEffect, useState } from "react";
import CreatePost from "../../components/post/CreatePost";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import { IoOptionsOutline } from "react-icons/io5";
import { IconButton, ListItemButton } from "@mui/material";
import { usePopover } from "../../components/popmenu/PopMenu";
import BeatLoader from "react-spinners/BeatLoader";
import { Color } from "../../utils/Color";

const Home = () => {
  const [homeFeed, setHomeFeed] = useState([]);
  const [sortType, setSortType] = useState("ascending");
  const { posts, status, loadingMore } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id, openPopover, PopMenuWrapper, handleClosePopover } = usePopover();

  const sortByDate = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (sortType === "ascending") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setHomeFeed(sortedPosts);
    handleClosePopover();
    setSortType((state) =>
      state === "ascending" ? "descending" : "ascending"
    );
  };

  const sortByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return b.likes.likeCount - a.likes.likeCount;
    });
    setHomeFeed(sortedPosts);
    handleClosePopover();
  };

  useEffect(() => {
    (() => {
      const feed = posts.filter(({ userId }) => {
        if (userId === user._id) return true;
        for (let i = 0; i < user.following.length; i++) {
          if (userId === user.following[i]._id) {
            return true;
          }
        }
        return false;
      });
      const sortedPosts = [...feed].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setHomeFeed(sortedPosts);
    })();
  }, [posts]);

  useEffect(() => {
    // To scroll window to top
    window.scrollTo(0, 0);

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
          <ul className="popup-item">
            <ListItemButton onClick={sortByDate}>
              <p className="filter-option">Sort by date</p>
            </ListItemButton>
            <ListItemButton onClick={sortByLikes}>
              <p className="filter-option">Sort by trending</p>
            </ListItemButton>
          </ul>
        </PopMenuWrapper>
      </div>

      <section className="userpost mg-top-1x mg-bottom-5x">
        {homeFeed.length > 0 ? (
          homeFeed?.map((post) => (
            <UserPost {...post} key={post._id} user={user} />
          ))
        ) : (
          <p className="t4">
            You have not followed or posted any thing, follow more people to see
            their posts!
          </p>
        )}
        <div className="flex-center">
          {loadingMore && (
            <BeatLoader color={Color.primary} loading={true} size={20} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
