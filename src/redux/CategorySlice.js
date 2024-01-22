import { createSlice } from "@reduxjs/toolkit";

const CategoryState = {
  productCategory: "smartphones",
};

const categorySlice = createSlice({
  name: "category",
  initialState: CategoryState,
  reducers: {
    changeProductCategory(state, action) {
      state.productCategory = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
