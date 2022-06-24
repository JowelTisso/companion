import "./Bookmark.css";
import React, { useEffect, useRef, useState } from "react";
import UserPost from "../../components/userpost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks, loadMoreBookmarks } from "../../store/bookmarkSlice";
import { useInfiniteScrolling } from "../../utils/infinteScrolling";
import { BeatLoader } from "react-spinners";
import { Color } from "../../utils/Color";

const Bookmark = () => {
  const [userBookmarks, setUserBookmarks] = useState([]);
  const { bookmarks, bookmarkStatus, loadingMore } = useSelector(
    (state) => state.bookmark
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const lastPostRef = useRef();
  useInfiniteScrolling(
    lastPostRef,
    loadMoreBookmarks,
    (state) => state.bookmark
  );

  useEffect(() => {
    const filteredBookmarks = bookmarks?.filter(
      (bookmark) => bookmark.bookmarkUserId === user._id
    );
    const sortedPosts = [...filteredBookmarks].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setUserBookmarks(sortedPosts);
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
        <div className="flex-center" ref={lastPostRef}>
          {loadingMore && (
            <BeatLoader color={Color.primary} loading={true} size={20} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Bookmark;
