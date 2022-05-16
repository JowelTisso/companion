import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isModal: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.isModal = !state.isModal;
    },
  },
});

export const { toggleModal } = homeSlice.actions;
export default homeSlice.reducer;
