import "./Bookmark.css";
import React, { useState, useEffect } from "react";
import { API } from "../../utils/Constant";
import { GET } from "../../utils/axiosHelper";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { updateBookmarks } from "../../store/userSlice";

const Bookmark = () => {
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await GET(API.ALL_BOOKMARKS, true);
        if (res?.status === 200 || res?.status === 201) {
          dispatch(updateBookmarks({ bookmarks: res?.data.bookmarks }));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="home-wrapper">
      <p className="t4 section-title">Bookmarks</p>
      <section className="userpost mg-top-1x">
        {bookmarks.map((post) => (
          <UserPost {...post} key={post._id} />
        ))}
      </section>
    </div>
  );
};

export default Bookmark;
