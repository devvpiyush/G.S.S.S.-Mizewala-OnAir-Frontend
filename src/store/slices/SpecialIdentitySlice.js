// External Modules
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  teacherInfo: {
    status: null,
    assignedClass: null,
    subject: null,
    designation: null,
    qualifications: [],
    dateOfJoining: null,
  },
  studentInfo: {
    class: null,
    parentName: null,
    rollNumber: null,
    section: null,
  },
  adminInfo: {
    permissionsLevel: null,
    status: null,
  },
};

const SpecialIdentitySlice = createSlice({
  name: "SpecialIdentity",
  initialState: INITIAL_STATE,
  reducers: {
    SETUP_TEACHER: (state, action) => {
      state.teacherInfo.status = action.payload.status;
      state.teacherInfo.assignedClass = action.payload.assignedClass;
      state.teacherInfo.subject = action.payload.subject;
      state.teacherInfo.designation = action.payload.designation;
      state.teacherInfo.qualifications = action.payload.qualifications;
      state.teacherInfo.dateOfJoining = action.payload.dateOfJoining;
    },
    SETUP_STUDENT: (state, action) => {
      state.studentInfo.class = action.payload.class;
      state.studentInfo.parentName = action.payload.parentName;
      state.studentInfo.rollNumber = action.payload.rollNumber;
      state.studentInfo.section = action.payload.section;
    },
    SETUP_ADMIN: (state, action) => {
      state.adminInfo.permissionsLevel = action.payload.permissionsLevel;
      state.adminInfo.status = action.payload.status;
    },
    LOGOUT: () => INITIAL_STATE,
  },
});

export const SpecialIdentityActions = SpecialIdentitySlice.actions;
export default SpecialIdentitySlice.reducer;
