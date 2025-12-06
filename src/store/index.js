// Importing Modules
import { configureStore } from "@reduxjs/toolkit";

// Slices
import User from "./Slices/User";
import MarkerSheet from "./Slices/MarkerSheet";

// Configuring Store
const STORE = configureStore({
  reducer: {
    USER: User,
    MARKER_SHEET: MarkerSheet,
  },
});

// Exporting Store
export default STORE;
