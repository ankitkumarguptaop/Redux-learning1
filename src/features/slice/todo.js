import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log(action.payload);
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
    },
    editTodo: (state, action) => {
      state.todos.splice(action.payload.index,1, action.payload.data )
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
