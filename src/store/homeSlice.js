import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isModal: false,
    editPostData: {
      isEditModal: false,
      content: "",
      postId: "",
    },
  },
  reducers: {
    toggleModal: (state, action) => {
      state.isModal = action.payload ? action.payload.isOpen : !state.isModal;
    },
    updateEditPostData: (state, action) => {
      state.editPostData.isEditModal = action.payload.isEditModal;
      state.editPostData.content = action.payload.content;
      state.editPostData.postId = action.payload.postId;
    },
  },
});

export const { toggleModal, updateEditPostData } = homeSlice.actions;
export default homeSlice.reducer;
