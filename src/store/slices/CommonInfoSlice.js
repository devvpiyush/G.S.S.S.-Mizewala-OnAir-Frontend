// External Modules
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  miPin: null,
  userType: "GUEST",
  accountStatus: null,
  name: null,
  address: null,
  age: null,
  avatarUrl: "https://res.cloudinary.com/dbelpwtoy/image/upload/v1767074898/Avatar_si1ngf.svg",
  gender: null,
  dateOfBirth: null,
  email: null,
  phone: null,
  reference: null,
};

const CommonInfoSlice = createSlice({
  name: "CommonInfoSlice",
  initialState: INITIAL_STATE,
  reducers: {
    SETUP_NEW_USER: (state, action) => {
      state.miPin = action.payload.miPin;
      state.userType = action.payload.userType;
      state.accountStatus = action.payload.accountStatus;
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.age = action.payload.dateOfBirth;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.reference = action.payload.reference;
    },
    LOGOUT: (state) => {
      state = INITIAL_STATE;
    },
  },
});

export const CommonInfoActions = CommonInfoSlice.actions;
export default CommonInfoSlice.reducer;
