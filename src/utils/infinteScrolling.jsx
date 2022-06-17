import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useInfiniteScrolling = (ref, loadMore, selector) => {
  const { currentPageNumber, hasMore, loadingMore } = useSelector(selector);
  const dispatch = useDispatch();
  const nextPage = currentPageNumber + 1;

  useEffect(() => {
    const node = ref?.current;
    if (!node || loadingMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            dispatch(loadMore(nextPage));
          }
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, nextPage, hasMore]);
};

export { useInfiniteScrolling };
