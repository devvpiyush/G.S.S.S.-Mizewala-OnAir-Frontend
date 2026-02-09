// External Modules
import { createContext, useState } from "react";

// External Modules
export const APIsContext = createContext();

const APIsContextProvider = ({ children }) => {
  const [LOGIN_API_CALLED, SET_LOGIN_API_CALLED] = useState(false);
  const [AUTH_API_CALLED, SET_AUTH_API_CALLED] = useState(false);
  const [PROFILE_API_CALLED, SET_PROFILE_API_CALLED] = useState(false);
  const [INTERNALS_API_CALLED, SET_INTERNALS_API_CALLED] = useState(false);
  return (
    <APIsContext.Provider
      value={{
        LOGIN_API_CALLED,
        SET_LOGIN_API_CALLED,
        AUTH_API_CALLED,
        SET_AUTH_API_CALLED,
        PROFILE_API_CALLED,
        SET_PROFILE_API_CALLED,
        INTERNALS_API_CALLED,
        SET_INTERNALS_API_CALLED,
      }}
    >
      {children}
    </APIsContext.Provider>
  );
};

export default APIsContextProvider;
