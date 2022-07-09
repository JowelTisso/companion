import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  bookmarks: [],
  allBookmarks: [],
  bookmarkStatus: "idle",
  bookmarkError: null,
  currentPageNumber: 1,
  hasMore: false,
  loadingMore: false,
};

export const loadAllBookmarks = createAsyncThunk(
  "bookmark/loadAllBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GET(API.ALL_BOOKMARKS, true);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.bookmarks;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const loadBookmarks = createAsyncThunk(
  "bookmark/loadBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.BOOKMARK}?page=1}`, true);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const loadMoreBookmarks = createAsyncThunk(
  "bookmark/loadMoreBookmarks",
  async (pageNumber, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.BOOKMARK}?page=${pageNumber}}`, true);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async ({ postId, bookmarkUserId }, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.BOOKMARK}/${postId}`, {
        bookmarkUserId,
      });
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.bookmarks;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmark/removeBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.REMOVE_BOOKMARK}/${postId}`, {});
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.bookmarks;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    updateBookmarks: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
    },
  },
  extraReducers: {
    // Load All bookmark
    [loadAllBookmarks.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },
    [loadAllBookmarks.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fullfilled";
      state.allBookmarks = action.payload;
    },
    [loadAllBookmarks.rejected]: (state, action) => {
      state.bookmarkStatus = "rejected";
      state.bookmarkError = action.payload;
    },

    // Load bookmark
    [loadBookmarks.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },
    [loadBookmarks.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fullfilled";
      state.bookmarks = action.payload.bookmarks;
    },
    [loadBookmarks.rejected]: (state, action) => {
      state.bookmarkStatus = "rejected";
      state.bookmarkError = action.payload;
    },

    // Add bookmark
    [addBookmark.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },
    [addBookmark.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fullfilled";
      state.bookmarks = action.payload;
      state.allBookmarks = action.payload;
    },
    [addBookmark.rejected]: (state, action) => {
      state.bookmarkStatus = "rejected";
      state.bookmarkError = action.payload;
    },

    //Remove bookmark
    [removeBookmark.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fullfilled";
      state.bookmarks = action.payload;
      state.allBookmarks = action.payload;
    },
    [removeBookmark.rejected]: (state, action) => {
      state.bookmarkStatus = "rejected";
      state.bookmarkError = action.payload;
    },

    //   load more posts
    [loadMoreBookmarks.pending]: (state) => {
      state.loadingMore = true;
    },
    [loadMoreBookmarks.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.loadingMore = false;
      state.bookmarks = action.payload.bookmarks;
    },
    [loadMoreBookmarks.rejected]: (state, action) => {
      state.status = "rejected";
      state.loadingMore = false;
      state.error = action.payload;
    },
  },
});

export const { updateBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
