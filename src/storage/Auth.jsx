// External Modules
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";

// Local Modules
import api from "@utils/api.js";
import { User_Actions } from "@/store/slices/UserSlice";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    api("GET", "auth/me").then((response) => {
      if (response.status === 200 && response.data.success) {
        const { name, userType, gender, photoUrl } = response.data.mongodata;
        dispatch(
          User_Actions.SET_USER({
            name,
            userType,
            gender,
            photoUrl,
          })
        );
      }
    });
  }, []);
  return <AuthContext.Provider value={""}>{children}</AuthContext.Provider>;
};
