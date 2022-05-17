import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GET(API.ALL_POST);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await POST(API.ADD_POST, { postData });
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.ALL_POST}/${postId}`, {});
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
  extraReducers: {
    //   load posts
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload;
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    //   create post
    [createPost.pending]: (state) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    //   delete post
    [deletePost.pending]: (state) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { updatePosts } = postSlice.actions;
export default postSlice.reducer;
