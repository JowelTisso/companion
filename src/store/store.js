import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import homeReducer from "./homeSlice";
import bookmarkSlice from "./bookmarkSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: homeReducer,
    bookmark: bookmarkSlice,
  },
});

export default store;
