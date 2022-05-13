import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../auth/helper/authHelper";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        size={"large"}
        className="t3"
        onClick={() => {
          userLogout(dispatch);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
