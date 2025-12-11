import api from "@utils/api.js";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { User_Actions } from "@/store/slices/UserSlice";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
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
        sessionStorage.getItem("loggedIn");
      });
    }
  }, []);
  return <AuthContext.Provider value={""}>{children}</AuthContext.Provider>;
};
