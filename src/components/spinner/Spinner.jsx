import "./Spinner.css";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { Color } from "../../utils/Color";

const Spinner = ({ loading }) => {
  const spinnerColor = Color.primary;
  return (
    <div className="loader flex-center">
      <BeatLoader color={spinnerColor} loading={loading} size={30} />
    </div>
  );
};

export default Spinner;
