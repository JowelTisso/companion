import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  isModal: false,
  editPostData: {
    isEditModal: false,
    content: "",
    images: null,
    postId: "",
    isBookmarked: false,
  },
  allUsers: [],
  status: "idle",
  error: null,
};

export const loadAllUsers = createAsyncThunk(
  "home/loadAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GET(API.ALL_USER, {});
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.users;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isModal = action.payload ? action.payload.isOpen : !state.isModal;
    },
    updateEditPostData: (state, action) => {
      state.editPostData.isEditModal = action.payload.isEditModal;
      state.editPostData.content = action.payload.content;
      state.editPostData.images = action.payload.images;
      state.editPostData.postId = action.payload.postId;
      state.editPostData.isBookmarked = action.payload.isBookmarked;
    },
  },
  extraReducers: {
    //   load posts
    [loadAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [loadAllUsers.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.allUsers = action.payload;
    },
    [loadAllUsers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { toggleModal, updateEditPostData } = homeSlice.actions;
export default homeSlice.reducer;
