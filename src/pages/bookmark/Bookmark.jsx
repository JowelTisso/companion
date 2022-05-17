import "./Bookmark.css";
import React, { useEffect } from "react";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks } from "../../store/bookmarkSlice";
import Spinner from "../../components/spinner/Spinner";

const Bookmark = () => {
  const { bookmarks, bookmarkStatus } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarkStatus === "idle") {
      dispatch(loadBookmarks());
    }
  }, [dispatch, bookmarkStatus]);

  if (bookmarkStatus === "loading") {
    return <Spinner loading={true} />;
  }

  return (
    <div className="home-wrapper">
      <p className="t4 section-title">Bookmarks</p>
      <section className="userpost mg-top-1x">
        {bookmarks.length > 0 ? (
          bookmarks?.map((post) => <UserPost {...post} key={post._id} />)
        ) : (
          <p className="t4">You have not bookmarked any post yet!</p>
        )}
      </section>
    </div>
  );
};

export default Bookmark;
