import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import homeReducer from "./homeSlice";
import bookmarkSlice from "./bookmarkSlice";
import postSlice from "./postSlice";
import profileSlice from "./profileSlice";
import commentSlice from "./commentSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: homeReducer,
    bookmark: bookmarkSlice,
    post: postSlice,
    profile: profileSlice,
    comment: commentSlice,
    theme: themeSlice,
  },
});

export default store;
