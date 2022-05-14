import "./ContentRoutes.css";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Rightnav from "../components/rightnav/Rightnav";
import Sidenav from "../components/sidenav/Sidenav";

const ContentRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.token) {
    return (
      <>
        <Header />
        <section className="content-wrapper">
          <Sidenav />
          <main className="main-wrapper">{children}</main>
          <Rightnav />
        </section>
      </>
    );
  }
  return children;
};

export default ContentRoutes;
