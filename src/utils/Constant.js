// Auth
export const USER_TOKEN = "USER_TOKEN";

// Api
export const API = Object.freeze({
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  ALL_POST: "/api/posts",
  ADD_POST: "/api/posts",
  EDIT_POST: "/api/posts/edit",
  LIKE_POST: "/api/posts/like",
  DISLIKE_POST: "/api/posts/dislike",
  USER_POST: "/api/posts/user",
  ALL_BOOKMARKS: "/api/users/bookmark",
  ADD_BOOKMARK: "/api/users/bookmark",
  REMOVE_BOOKMARK: "/api/users/remove-bookmark",
  FOLLOW_USER: "/api/users/follow",
  UNFOLLOW_USER: "/api/users/unfollow",
  ALL_USER: "/api/users",
  EDIT_USER: "/api/users/edit",
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
});
