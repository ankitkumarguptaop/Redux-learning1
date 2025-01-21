import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount: 10,
  };


export const accountSlice = createSlice({
    name: 'counter', initialState,   reducers: {
        increment: (state) => {
          state.amount += 1; 
        },
        decrement: (state) => {
          state.amount -= 1;
        },
        incrementByAmount: (state, action) => {
          state.amount += action.payload;
        },
      },
    
})

export const { increment, decrement, incrementByAmount } = accountSlice.actions;
export default accountSlice.reducer;
