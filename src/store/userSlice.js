import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    bookmarks: [],
  },
  reducers: {
    updateBookmarks: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
    },
    clearBookmarks: (state, action) => {
      state.bookmarks = [];
    },
  },
});

export const { updateBookmarks, clearBookmark } = userSlice.actions;
export default userSlice.reducer;
