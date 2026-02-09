// External Modules
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

// Local Modules
import api from "@utils/api.js";
import { CommonIdentityActions } from "@/store/slices/CommonIdentitySlice";
import { SpecialIdentityActions } from "@/store/slices/SpecialIdentitySlice";
import { APIsContext } from "./APIs";

export const AuthProvider = ({ children }) => {
  // Declarations
  const dispatch = useDispatch();
  const { SET_AUTH_API_CALLED } = useContext(APIsContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        SET_AUTH_API_CALLED(true);
        const response = await api("GET", "u/get/p/me", true);

        let refObj = response.data.reference;

        delete response.data.reference;

        dispatch(
          CommonIdentityActions.SETUP_NEW_USER({
            ...response.data,
          }),
        );
        if (response.data.userType === "Teacher") {
          dispatch(
            SpecialIdentityActions.SETUP_TEACHER({
              ...refObj,
            }),
          );
        } else if (response.data.userType === "Student") {
          dispatch(
            SpecialIdentityActions.SETUP_STUDENT({
              ...refObj,
            }),
          );
        } else if (response.data.userType === "Admin") {
          dispatch(
            SpecialIdentityActions.SETUP_ADMIN({
              ...refObj,
            }),
          );
        }
      } catch {
        dispatch(CommonIdentityActions.LOGOUT());
        dispatch(SpecialIdentityActions.LOGOUT());
      } finally {
        SET_AUTH_API_CALLED(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};
