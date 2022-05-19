import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  bookmarks: [],
  bookmarkStatus: "idle",
  bookmarkError: null,
};

export const loadBookmarks = createAsyncThunk(
  "bookmark/loadBookmarks",
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

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.ADD_BOOKMARK}/${postId}`, {});
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
    // Load bookmark
    [loadBookmarks.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },
    [loadBookmarks.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fullfilled";
      state.bookmarks = action.payload;
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
    },
    [removeBookmark.rejected]: (state, action) => {
      state.bookmarkStatus = "rejected";
      state.bookmarkError = action.payload;
    },
  },
});

export const { updateBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
