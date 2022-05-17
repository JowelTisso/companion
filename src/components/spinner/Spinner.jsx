import "./Spinner.css";
import React from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  const spinnerColor = "#048434";
  return (
    <div className="loader flex-center">
      <BeatLoader
        color={spinnerColor}
        loading={loading}
        css={override}
        size={30}
      />
    </div>
  );
};

export default Spinner;
