import api from "@utils/api.js";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [User, SetUser] = useState();

  async function fetchMyInfo() {
    return await api("GET", "auth/me");
  }

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      const response = fetchMyInfo();
      if (response.status === 200 && response.data.success) {
        const UserData = response.data.mongodata;
        console.log(UserData);
      } else {
        SetUser(null);
        return;
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ User, SetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
