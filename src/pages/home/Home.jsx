import "./Home.css";
import React from "react";
import CreatePost from "../../components/post/CreatePost";

const Home = () => {
  return (
    <div className="home-wrapper">
      <CreatePost />
    </div>
  );
};

export default Home;
