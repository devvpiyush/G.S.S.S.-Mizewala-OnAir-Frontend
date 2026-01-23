// External Modules
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Local Modules
import api from "@utils/api.js";
import { CommonIdentityActions } from "@/store/slices/CommonIdentitySlice";
import { SpecialIdentityActions } from "@/store/slices/SpecialIdentitySlice";
import { APIsContext } from "./APIs";

export const AuthProvider = ({ children }) => {
  // Declarations
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  const dispatch = useDispatch();
  const { SET_AUTH_API_CALLED } = useContext(APIsContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        SET_AUTH_API_CALLED(true);
        const response = await api("GET", "u/get/p/me", true);
        dispatch(
          CommonIdentityActions.SETUP_NEW_USER({
            ...response.data.mongodata.common,
          }),
        );
        if (response.data.mongodata.common.userType === "Teacher") {
          dispatch(
            SpecialIdentityActions.SETUP_TEACHER({
              ...response.data.mongodata.special,
            }),
          );
        } else if (response.data.mongodata.common.userType === "Student") {
          dispatch(
            SpecialIdentityActions.SETUP_STUDENT({
              ...response.data.mongodata.special,
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

    if (USER.isLoggedIn) {
      checkAuth();
    }
  }, [dispatch]);

  return children;
};
