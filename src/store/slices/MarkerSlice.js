// External Modules
import { createSlice } from "@reduxjs/toolkit";

const MarkerSheetSlice = createSlice({
  name: "MarkerSheet",
  initialState: [],
  reducers: {
    Mark: (state, action) => {
      const entryIndex = state.findIndex(
        (entry) => entry.ID === action.payload.ID
      );

      if (entryIndex !== -1) {
        // Update existing Attendence entry Status
        state[entryIndex] = {
          ...state[entryIndex],
          ...action.payload,
        };
      } else {
        state.push(action.payload); // Mark new Attendence
      }
    },
    DeleteMark: (state, action) => {
      return state.filter((entry) => entry.ID !== action.payload);
    },
  },
});

export const MarkerActions = MarkerSheetSlice.actions;
export default MarkerSheetSlice.reducer;
