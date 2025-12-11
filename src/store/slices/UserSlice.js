// Importing Modules
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER_INFO = {
  userType: "GUEST",
};

const User_Slice = createSlice({
  name: "User",
  initialState: INITIAL_USER_INFO,
  reducers: {
    SET_USER: (state, action) => {
      return { ...state, ...action.payload, IS_LOGGED_IN: true };
    },
    UPDATE_USER: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Exportion Block
export const User_Actions = User_Slice.actions;
export default User_Slice.reducer;
