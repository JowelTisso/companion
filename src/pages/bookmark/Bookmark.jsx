import "./Bookmark.css";
import React, { useEffect, useState } from "react";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks } from "../../store/bookmarkSlice";

const Bookmark = () => {
  const [userBookmarks, setUserBookmarks] = useState([]);
  const { bookmarks, bookmarkStatus } = useSelector((state) => state.bookmark);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkStatus === "idle") {
      dispatch(loadBookmarks());
      const filteredBookmarks = bookmarks?.filter(
        (bookmark) => bookmark.username === user.username
      );
      setUserBookmarks(filteredBookmarks);
    }
  }, [dispatch, bookmarkStatus]);

  useEffect(() => {
    const filteredBookmarks = bookmarks?.filter(
      (bookmark) => bookmark.bookmarkUserId === user._id
    );
    setUserBookmarks(filteredBookmarks);
  }, [bookmarks]);

  return (
    <div className="home-wrapper">
      <p className="t4 section-title">Bookmarks</p>
      <section className="userpost mg-top-1x">
        {userBookmarks?.length > 0 ? (
          userBookmarks?.map((post) => (
            <UserPost {...post} key={post._id} user={user} />
          ))
        ) : (
          <p className="t4">You have not bookmarked any post yet!</p>
        )}
      </section>
    </div>
  );
};

export default Bookmark;
