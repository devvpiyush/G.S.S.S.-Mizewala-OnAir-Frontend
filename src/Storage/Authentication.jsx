import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 1. Create Context
const AuthContext = createContext();

// 2. AuthProvider Component
export function AuthProvider({ children }) {
  const [UserType, setUserType] = useState("Checking...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isUser = sessionStorage.getItem("User");
    const isGuest = sessionStorage.getItem("Guest");

    if (isUser) {
      setUserType("USER");
    } else if (isGuest) {
      setUserType("GUEST");
    } else {
      setUserType("No Session Found");

      // Public Routes
      const publicRoutes = [
        "/login",
        "/help",
        "/gallery",
        "/about",
        "/release_notes",
        "/credits",
      ];
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <AuthContext.Provider value={{ UserType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}

// Exportion (Block)
export default AuthContext;
