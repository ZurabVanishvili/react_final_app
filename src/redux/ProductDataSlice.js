import {createSlice} from "@reduxjs/toolkit";

const data = {
  dataProduct: [],
  productCategoryList: [],
};

const productDataSlice = createSlice({
  name: "data",
  initialState: data,
  reducers: {
    pushDataProduct(state, action) {
      state.dataProduct = action.payload;
    },
    pushProductCategory(state, action) {
      state.productCategoryList = action.payload;
    },
    deleteProduct(state, action) {
      state.dataProduct = state.dataProduct.filter(
          (product) => product.id !== action.payload
      );
    },
    addProduct(state, action) {
      state.dataProduct.unshift(action.payload);
    },
    editProduct(state, action) {
      state.dataProduct = state.dataProduct.map((product) =>
          product.id === action.payload.id ? action.payload : product
      );
    },
    addCategory(state, action) {
      state.productCategoryList.push(action.payload);
    },
  },
});

export const dataSliceActions = productDataSlice.actions;
export default productDataSlice.reducer;
