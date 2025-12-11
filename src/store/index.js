// Importing Modules
import { configureStore } from "@reduxjs/toolkit";

// Slices
import User from "./slices/UserSlice";
import MarkerSheet from "./slices/MarkerSlice";

// Configuring Store
const STORE = configureStore({
  reducer: {
    USER: User,
    MARKER_SHEET: MarkerSheet,
  },
});

// Exporting Store
export default STORE;
