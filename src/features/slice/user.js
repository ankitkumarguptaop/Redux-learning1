import { createSlice } from "@reduxjs/toolkit";

    
const initialState = {
    usersData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("action", action.payload);
      state.usersData =  [...state.usersData ,action.payload]
    }
  }
}
);

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
