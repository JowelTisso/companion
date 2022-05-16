import "./UserPost.css";
import React from "react";
import { Avatar } from "@mui/material";
import {
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoChatboxOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
} from "react-icons/io5";

const UserPost = ({ content, images }) => {
  return (
    <div className="post-card-user pd-2x">
      <section className="item-user">
        <Avatar
          sx={{ borderRadius: 2, width: 40, height: 40 }}
          variant="rounded"
        >
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="profile avatar"
            className="avatar pointer"
          />
        </Avatar>
        <div className="pd-left-2x">
          <p className="t4 username">Jowel Tisso</p>
          <p className="post-time">12 hours ago</p>
        </div>
        <IoEllipsisHorizontal className="t3 post-menu pointer" />
      </section>
      <section className="post-content mg-top-2x">
        <p className="t4 post-txt">{content}</p>
        <main className="post-img-container mg-top-2x">
          {images &&
            images.map((img, id) => (
              <img key={id} src={img} alt="post image" className="post-img" />
            ))}
        </main>
        <span className="post-icon-user-container mg-top-2x">
          <IoHeartOutline className="t3 post-icon pointer" />
          <IoChatboxOutline className="t3 post-icon pointer" />
          <IoShareSocialOutline className="t3 post-icon pointer" />
          <IoBookmarkOutline className="t3 post-icon pointer" />
        </span>
      </section>
    </div>
  );
};

export default UserPost;
