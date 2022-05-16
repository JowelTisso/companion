import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import homeReducer from "./homeSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: homeReducer,
  },
});

export default store;
