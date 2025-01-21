import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slice/user.js"
import todoReducer from"../features/slice/todo.js"
import postReducer from"../features/posts/posts.slice.js"

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';



const persistTodoConfig = {
  key: "todos",
  storage,
};

const persistUserConfig = {
  key: "users",
  storage,
  
};

export const persistedTodoReducer = persistReducer(persistTodoConfig, todoReducer);
export const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

export const store = configureStore({
  reducer: {
  todo:persistedTodoReducer,
  user:persistedUserReducer,
    post:postReducer
  },
});

export const persistor = persistStore(store);

