import "./NotFound.css";
import React from "react";
import img from "../../assets/notfound.jpg";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <img src={img} alt="Page not found" className="not-found-img" />
    </div>
  );
};

export default NotFound;
