import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slice/user.js"
import todoReducer from"../features/slice/todo.js"
import postReducer from"../features/posts/posts.slice.js"

export const store = configureStore({
  reducer: {
    user:userReducer,
    todo: todoReducer,
    post:postReducer
  },
});