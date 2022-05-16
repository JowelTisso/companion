import "./CreatePost.css";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";

const CreatePost = () => {
  return (
    <div className="post-card pd-2x">
      <Avatar sx={{ borderRadius: 2, width: 45, height: 45 }} variant="rounded">
        <img
          src="https://i.pravatar.cc/150?img=60"
          alt="profile avatar"
          className="avatar pointer"
        />
      </Avatar>
      <div className="post-details">
        <textarea
          type="text"
          className="post-input t4"
          placeholder="What's in your mind?"
        />
        <section className="post-actions-container">
          <span className="post-icon-container pd-left-3x">
            <IoImageOutline className="t3 post-icon pointer" />
            <AiOutlineFileGif className="t3 post-icon pointer" />
            <MdOutlineEmojiEmotions className="t3 post-icon pointer" />
          </span>
          <Button
            variant="contained"
            size={"medium"}
            onClick={() => {}}
            sx={{ borderRadius: 2, boxShadow: "none" }}
          >
            Post
          </Button>
        </section>
      </div>
    </div>
  );
};

export default CreatePost;
