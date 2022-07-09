import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  userProfile: {},
  status: "idle",
  error: null,
  userPosts: [],
  isModalOpen: false,
  currentPageNumber: 1,
  hasMore: false,
  loadingMore: false,
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
        return res?.data;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const getMoreUserPosts = createAsyncThunk(
  "profile/getMoreUserPosts",
  async ({ username, pageNumber }, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.USER_POST}/${username}?page=${pageNumber}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data;
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
      state.userPosts = action.payload.posts;
      if (action.payload?.nextPage) {
        state.hasMore = true;
      }
    },
    [getUserPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    //   get more user posts
    [getMoreUserPosts.pending]: (state) => {
      state.loadingMore = true;
    },
    [getMoreUserPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.loadingMore = false;
      action.payload.posts.map((post) => state.userPosts.push(post));
      state.currentPageNumber += 1;
      if (action.payload?.nextPage) {
        state.hasMore = true;
      } else {
        state.hasMore = false;
      }
    },
    [getMoreUserPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.loadingMore = false;
      state.error = action.payload;
    },
  },
});

export const { updateProfile, toggleEditProfileModal } = profileSlice.actions;
export default profileSlice.reducer;
