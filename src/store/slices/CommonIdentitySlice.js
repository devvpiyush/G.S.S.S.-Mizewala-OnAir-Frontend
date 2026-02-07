// External Modules
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isLoggedIn: false,
  _id: null,
  miPin: null,
  userType: "GUEST",
  accountStatus: null,
  name: null,
  address: null,
  profilePictureUrl:
    "https://res.cloudinary.com/dbelpwtoy/image/upload/v1767074898/Avatar_si1ngf.svg",
  gender: null,
  dateOfBirth: null,
  email: null,
  phone: null,
  reference: null,
};

const CommonIdentitySlice = createSlice({
  name: "CommonIdentity",
  initialState: INITIAL_STATE,
  reducers: {
    SETUP_NEW_USER: (state, action) => {
      state.isLoggedIn = true;
      state._id = action.payload._id;
      state.miPin = action.payload.miPin;
      state.userType = action.payload.userType;
      state.accountStatus = action.payload.accountStatus;
      state.name = action.payload.name;
      state.profilePictureUrl = action.payload.profilePictureUrl;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.reference = action.payload.reference;
    },
    LOGOUT: () => INITIAL_STATE,
  },
});

export const CommonIdentityActions = CommonIdentitySlice.actions;
export default CommonIdentitySlice.reducer;
