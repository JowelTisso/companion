import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  userProfile: {},
  status: "idle",
  error: null,
  userPosts: [],
  isModalOpen: false,
};

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.ALL_USER}/${userId}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.user;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "profile/getUserPosts",
  async (username, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.USER_POST}/${username}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.userProfile = action.payload.userProfile;
    },
    toggleEditProfileModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: {
    //   get user
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.userProfile = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    //   get user posts
    [getUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.userPosts = action.payload;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { updateProfile, toggleEditProfileModal } = profileSlice.actions;
export default profileSlice.reducer;
