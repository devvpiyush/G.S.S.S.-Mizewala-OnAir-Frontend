// External Modules
import { useDispatch } from "react-redux";

// Local Modules
import { SpecialIdentityActions } from "@/store/slices/SpecialIdentitySlice";
import { CommonIdentityActions } from "@/store/slices/CommonIdentitySlice";

export const useOrganizer = () => {
  const dispatch = useDispatch();

  return (data, reference) => {
    const obj = data;
    delete obj.reference;

    dispatch(CommonIdentityActions.SETUP_NEW_USER(data));

    if (obj.userType === "Teacher") {
      dispatch(SpecialIdentityActions.SETUP_TEACHER(reference));
    } else if (data.userType === "Student") {
      dispatch(SpecialIdentityActions.SETUP_STUDENT(reference));
    } else if (data.userType === "Admin") {
      dispatch(SpecialIdentityActions.SETUP_ADMIN(reference));
    }
  };
};
