import "./ContentRoutes.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import Rightnav from "../components/rightnav/Rightnav";
import Sidenav from "../components/sidenav/Sidenav";
import { toggleModal, updateEditPostData } from "../store/homeSlice";
import { Modal } from "@mui/material";
import CreatePost from "../components/post/CreatePost";

const ContentRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { isModal } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(updateEditPostData({ isEditModal: false, content: "" }));
  };

  if (auth.token) {
    return (
      <>
        <Header />

        <section className="content-wrapper">
          <Sidenav />
          <main className="main-wrapper pd-top-2x pd-bottom-4x">
            {children}
          </main>
          <Rightnav />
        </section>

        <Modal open={isModal} onClose={handleClose}>
          <main className="modal-content flex-center">
            <CreatePost dispatch={dispatch} />
          </main>
        </Modal>
      </>
    );
  }
  return children;
};

export default ContentRoutes;
