import {createSlice} from "@reduxjs/toolkit";

const data = {
  commentsData: [],
  postsData: [],
};

const commentsDataSlice = createSlice({
  name: "comments",
  initialState: data,
  reducers: {
    pushDataComments(state, action) {
      state.commentsData = action.payload;
    },
    pushDataPosts(state, action) {
      state.postsData = action.payload;
    },
    addComment(state, action) {
      state.commentsData.unshift(action.payload);
    },
    deleteComment(state, action) {
      state.commentsData = state.commentsData.filter(
          (comment) => comment.id !== action.payload
      );
    },
    editComment(state, action) {
      state.commentsData = state.commentsData.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
      );
    },
  },
});

export const commentsDataActions = commentsDataSlice.actions;
export default commentsDataSlice.reducer;
