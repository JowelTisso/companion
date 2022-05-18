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
  ALL_BOOKMARKS: "/api/users/bookmark",
  ADD_BOOKMARK: "/api/users/bookmark",
  REMOVE_BOOKMARK: "/api/users/remove-bookmark",
});

// Routes
export const ROUTES = Object.freeze({
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
  EXPLORE: "/explore",
  BOOKMARK: "/bookmark",
  NOTIFICATION: "/notification",
  PROFILE: "/profile",
});
