import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import homeReducer from "./homeSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: homeReducer,
    user: userSlice,
  },
});

export default store;
