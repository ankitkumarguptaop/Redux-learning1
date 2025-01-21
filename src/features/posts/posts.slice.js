import { createSlice } from "@reduxjs/toolkit";
import { fetchPost } from "./posts.action";
const initialState = {
  content: [],
  isLoading: false,
  error: null,
};

// slice is used for particular type of data

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload;
        console.log("state.content", state.content);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
