import "./Spinner.css";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ loading }) => {
  const spinnerColor = "#048434";
  return (
    <div className="loader flex-center">
      <BeatLoader color={spinnerColor} loading={loading} size={30} />
    </div>
  );
};

export default Spinner;
