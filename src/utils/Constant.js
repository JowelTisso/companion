// Auth
export const USER_TOKEN = "USER_TOKEN";

// Api
export const API = Object.freeze({
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  ALL_POST: "/api/posts",
  EXPLORE_POST: "/api/posts/explore",
  EXPLORE_POST_UPTO: "/api/posts/explore/upto",
  ADD_POST: "/api/posts",
  EDIT_POST: "/api/posts/edit",
  LIKE_POST: "/api/posts/like",
  DISLIKE_POST: "/api/posts/dislike",
  USER_POST: "/api/posts/user",
  ALL_BOOKMARKS: "/api/users/allbookmark",
  BOOKMARK: "/api/users/bookmark",
  REMOVE_BOOKMARK: "/api/users/remove-bookmark",
  FOLLOW_USER: "/api/users/follow",
  UNFOLLOW_USER: "/api/users/unfollow",
  ALL_USER: "/api/users",
  EDIT_USER: "/api/users/edit",
  ALL_COMMENTS: "/api/comments",
  ADD_COMMENT: "/api/comments/add",
  EDIT_COMMENT: "/api/comments/edit",
  DELETE_COMMENT: "/api/comments/delete",
});

// Routes
export const ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  EXPLORE: "/explore",
  PROFILE: "/profile",
  BOOKMARK: "/bookmark",
  NOTIFICATION: "/notification",
  POST: "/post",
});
