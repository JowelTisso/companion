import "./Explore.css";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPost from "../../components/userpost/UserPost";
import {
  loadExplorePosts,
  loadMoreExplorePosts,
  updateExplorePosts,
} from "../../store/postSlice";
import { BeatLoader } from "react-spinners";
import { Color } from "../../utils/Color";
import { useInfiniteScrolling } from "../../utils/infinteScrolling";

const Explore = () => {
  const { explorePosts, loadingMore } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const lastPostRef = useRef();
  useInfiniteScrolling(
    lastPostRef,
    loadMoreExplorePosts,
    (state) => state.post
  );

  const sortByDate = () => {
    const sortedPosts = [...explorePosts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    dispatch(updateExplorePosts({ explorePosts: sortedPosts }));
  };

  const sortByLikes = () => {
    const sortedPosts = [...explorePosts].sort((a, b) => {
      return new Date(b.likes.likeCount) - new Date(a.likes.likeCount);
    });
    dispatch(updateExplorePosts({ explorePosts: sortedPosts }));
  };

  useEffect(() => {
    dispatch(loadExplorePosts());
    // To scroll window to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-wrapper explore-wrapper">
      <p className="t4 section-title">Explore</p>
      <nav className="tabs mg-top-1x">
        <ul className="list">
          <li className="list-item" onClick={sortByDate}>
            Latest
          </li>
          <li className="list-item" onClick={sortByLikes}>
            Trending
          </li>
        </ul>
      </nav>
      <section className="userpost mg-top-1x">
        {explorePosts?.length > 0 ? (
          explorePosts?.map((post) => (
            <UserPost {...post} key={post._id} user={user} />
          ))
        ) : (
          <p className="t4">There is no content to explore!</p>
        )}
        <div className="flex-center" ref={lastPostRef}>
          {loadingMore && (
            <BeatLoader color={Color.primary} loading={true} size={20} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
