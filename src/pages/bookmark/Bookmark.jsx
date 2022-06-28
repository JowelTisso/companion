import "./Bookmark.css";
import React, { useEffect, useState } from "react";
import UserPost from "../../components/userpost/UserPost";
import { useSelector } from "react-redux";
import { callToast } from "../../components/toast/Toast";

const Bookmark = () => {
  const [userBookmarks, setUserBookmarks] = useState([]);
  const { bookmarks } = useSelector((state) => state.bookmark);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      const filteredBookmarks = bookmarks?.filter(
        (bookmark) => bookmark.bookmarkUserId === user._id
      );
      const sortedPosts = [...filteredBookmarks].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setUserBookmarks(sortedPosts);
    } catch (err) {
      callToast(`Unable to fetch bookmark! : Reason : ${err.message}`);
    }
  }, [bookmarks]);

  useEffect(() => {
    // To scroll window to top
    window.scrollTo(0, 0);
  }, []);

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
