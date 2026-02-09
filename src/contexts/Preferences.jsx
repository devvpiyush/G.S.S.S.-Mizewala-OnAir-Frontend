import { createContext, useState } from "react";

const PrefContext = createContext();

export const PrefProvider = ({ children }) => {
  const [LANGUAGE, UPDATE_LANGUAGE] = useState("en");
  return (
    <PrefContext.Provider value={{ LANGUAGE, UPDATE_LANGUAGE }}>
      {children}
    </PrefContext.Provider>
  );
};

// Exportion (Block)
export default PrefContext;
