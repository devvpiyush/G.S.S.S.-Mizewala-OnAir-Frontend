// External Modules
import { createSlice } from "@reduxjs/toolkit";

const MarkerSheetSlice = createSlice({
  name: "MarkerSheet",
  initialState: [],
  reducers: {
    Mark: (state, action) => {
      const entryIndex = state.findIndex(
        (entry) => entry._id === action.payload._id,
      );

      if (entryIndex !== -1) {
        state[entryIndex] = {
          ...state[entryIndex],
          ...action.payload,
        };
      } else {
        state.push({
          _id: action.payload._id,
          name: action.payload.name,
          fatherName: action.payload.fatherName,
          status: action.payload.status,
        });
      }
    },
    DeleteMark: (state, action) => {
      return state.filter((entry) => entry._id !== action.payload);
    },
  },
});

export const MarkerActions = MarkerSheetSlice.actions;
export default MarkerSheetSlice.reducer;
