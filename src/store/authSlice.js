import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    logIn: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    logOut: (state, action) => {
      return {
        ...state,
        token: "",
        user: {},
      };
    },
    signUp: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    },

    updateUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
  },
});

export const { logIn, logOut, signUp, updateUser } = authSlice.actions;
export default authSlice.reducer;
