import { configureStore } from "@reduxjs/toolkit";

import productCategoryReducer from "./CategorySlice";
import modalShowReducer from "./ModalShowSlice";
import dataSliceReducer from "./ProductDataSlice";
import usersDataSlice from "./UsersDataSlice";
import commentsDataReducer from "./CommentsDataSlice";

const store = configureStore({
  reducer: {
    productData: dataSliceReducer,
    usersData: usersDataSlice,
    commentsData: commentsDataReducer,
    category: productCategoryReducer,
    modalShow: modalShowReducer,
  },
});

export default store;
