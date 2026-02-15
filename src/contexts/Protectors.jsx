// External Modules
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Local Modules
import { APIsContext } from "./APIs";

const Routes = [
  { path: "/", type: "public" },
  { path: "/login", type: "public" },
  { path: "/help", type: "public" },
  { path: "/logout", type: "private" },
  { path: "/gallery", type: "public" },
  { path: "/dashboard", type: "private" },
  { path: "/dashboard/marker", type: "private", access: ["Teacher"] },
  { path: "/about", type: "public" },
  { path: "/credits", type: "public" },
  { path: "/release_notes", type: "public" },
  { path: "/notifications", type: "public" },
  { path: "/profile", type: "private" },
  { path: "/music", type: "public" },
];

export const BPS = ({ children }) => {
  // Declarations
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  const { AUTH_API_CALLED } = useContext(APIsContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const included = Routes.find(
      (route) =>
        location.pathname === route.path ||
        location.pathname.startsWith(route.path + "/"),
    );

    if (!included && !location.pathname.startsWith("/profile/")) {
      navigate("/", { replace: true });
    }

    if (included?.type === "private" && AUTH_API_CALLED && !USER?.isLoggedIn) {
      navigate("/", { replace: true });
    }

    if (
      included?.access &&
      included?.type === "private" &&
      AUTH_API_CALLED &&
      USER?.isLoggedIn &&
      !included.access.includes(USER.userType)
    ) {
      navigate("/", { replace: true });
    }
  }, [
    location.pathname,
    AUTH_API_CALLED,
    USER?.isLoggedIn,
    USER?.userType,
    navigate,
  ]);

  return children;
};
