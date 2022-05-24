import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "../utils/axiosHelper";
import { API } from "../utils/Constant";

const initialState = {
  comments: [],
  commentPost: null,
  status: "idle",
  error: null,
  isModalOpen: false,
  selectedComment: null,
};

export const loadCommentPost = createAsyncThunk(
  "comment/loadCommentPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.ALL_POST}/${postId}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.post;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const loadComments = createAsyncThunk(
  "comment/loadComments",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await GET(`${API.ALL_COMMENTS}/${postId}`);
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.comments;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const res = await POST(`${API.ADD_COMMENT}/${postId}`, {
        commentData,
      });
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.comments;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ postId, _id: commentId }, { rejectWithValue }) => {
    try {
      const res = await POST(
        `${API.DELETE_COMMENT}/${postId}/${commentId}`,
        {}
      );
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.comments;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ postId, selectedCommentId, commentData }, { rejectWithValue }) => {
    try {
      const res = await POST(
        `${API.EDIT_COMMENT}/${postId}/${selectedCommentId}`,
        {
          commentData,
        }
      );
      if (res?.status === 200 || res?.status === 201) {
        return res?.data.comments;
      }
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    updateCommentPost: (state, action) => {
      state.commentPost = action.payload.post;
    },
    toggleModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
    updateSelectedComment: (state, action) => {
      state.selectedComment = action.payload.comment;
    },
  },
  extraReducers: {
    // Load post
    [loadCommentPost.pending]: (state) => {
      state.status = "loading";
    },
    [loadCommentPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.commentPost = action.payload;
    },
    [loadCommentPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    // Load comments
    [loadComments.pending]: (state) => {
      state.status = "loading";
    },
    [loadComments.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.comments = action.payload;
    },
    [loadComments.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    // add comment
    [addComment.pending]: (state) => {
      state.status = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.comments = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    // delete comment
    [deleteComment.pending]: (state) => {
      state.status = "loading";
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.comments = action.payload;
    },
    [deleteComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    // edit comment
    [editComment.pending]: (state) => {
      state.status = "loading";
    },
    [editComment.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.comments = action.payload;
    },
    [editComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {
  updateComments,
  updateCommentPost,
  toggleModal,
  updateSelectedComment,
} = commentSlice.actions;
export default commentSlice.reducer;
