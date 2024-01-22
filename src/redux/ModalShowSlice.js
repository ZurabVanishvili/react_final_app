import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addModal: false,
  categoryModal: false,
};

const modalShowSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showAddModal(state) {
      state.addModal = true;
    },
    hideAddModal(state) {
      state.addModal = false;
    },
    showCategoryModal(state) {
      state.categoryModal = true;
    },
    hideCategoryModal(state) {
      state.categoryModal = false;
    },
  },
});

export const modalShowActions = modalShowSlice.actions;
export default modalShowSlice.reducer;
