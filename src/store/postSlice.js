import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE, GET, POST } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  likeStatus: "idle",
  currentPageNumber: 1,
  hasMore: false,
  loadingMore: false,
};

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.ALL_POST}?page=1`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.paginatedPosts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const loadMorePosts = createAsyncThunk(
  "post/loadMorePosts",
  async (pageNumber, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.ALL_POST}?page=${pageNumber}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.paginatedPosts;
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

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.EDIT_POST}/${postId}`, { postData });
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
      const res = await DELETE(`${API.ALL_POST}/${postId}`, {});
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.LIKE_POST}/${postId}`, {});
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.posts;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.DISLIKE_POST}/${postId}`, {});
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
      state.posts = action.payload.posts;
      if (action.payload?.nextPage) {
        state.hasMore = true;
      }
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

    //   edit post
    [editPost.pending]: (state) => {
      state.status = "loading";
    },
    [editPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload;
    },
    [editPost.rejected]: (state, action) => {
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

    //   like post
    [likePost.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [likePost.fulfilled]: (state, action) => {
      state.likeStatus = "fullfilled";
      state.posts = action.payload;
    },
    [likePost.rejected]: (state, action) => {
      state.likeStatus = "rejected";
      state.error = action.payload;
    },

    //   dislike post
    [dislikePost.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.likeStatus = "fullfilled";
      state.posts = action.payload;
    },
    [dislikePost.rejected]: (state, action) => {
      state.likeStatus = "rejected";
      state.error = action.payload;
    },

    //   load more posts
    [loadMorePosts.pending]: (state) => {
      state.loadingMore = true;
    },
    [loadMorePosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.loadingMore = false;
      action.payload.posts.map((post) => state.posts.push(post));
      state.currentPageNumber += 1;
      if (action.payload?.nextPage) {
        state.hasMore = true;
      } else {
        state.hasMore = false;
      }
    },
    [loadMorePosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.loadingMore = false;
      state.error = action.payload;
    },
  },
});

export const { updatePosts } = postSlice.actions;
export default postSlice.reducer;
