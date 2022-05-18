import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import homeReducer from "./homeSlice";
import bookmarkSlice from "./bookmarkSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: homeReducer,
    bookmark: bookmarkSlice,
    post: postSlice,
  },
});

export default store;
