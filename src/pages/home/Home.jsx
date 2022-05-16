import "./Home.css";
import React, { useEffect, useState } from "react";
import CreatePost from "../../components/post/CreatePost";
import UserPost from "../../components/userpost/UserPost";
import { API } from "../../utils/Constant";
import { GET } from "../../utils/axiosHelper";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/homeSlice";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await GET(API.ALL_POST);
        if (res?.status === 200 || res?.status === 201) {
          setPosts(res?.data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleClose = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="home-wrapper">
      <CreatePost />
      <section className="userpost mg-top-4x">
        {posts.map((post) => (
          <UserPost {...post} key={post.id} />
        ))}
      </section>
      <Modal open={home.isModal} onClose={handleClose}>
        <main className="modal-content flex-center">
          <CreatePost />
        </main>
      </Modal>
    </div>
  );
};

export default Home;
