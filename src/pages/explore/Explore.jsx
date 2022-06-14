import "./Explore.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPost from "../../components/userpost/UserPost";
import { updatePosts } from "../../store/postSlice";

const Explore = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sortByDate = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
  };

  const sortByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.likes.likeCount) - new Date(a.likes.likeCount);
    });
    dispatch(updatePosts({ posts: sortedPosts }));
  };

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
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <UserPost {...post} key={post._id} user={user} />
          ))
        ) : (
          <p className="t4">There is no content to explore!</p>
        )}
      </section>
    </div>
  );
};

export default Explore;
