// External Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local Modules
import api from "@utils/api";
import useHead from "@hooks/Head.jsx";
import { User_Actions } from "../../store/slices/UserSlice";

function Logout() {
  useHead({
    title: "Logout | G.S.S.S. Mirzewala",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        await api("POST", "auth/logout", true, {});
        dispatch(User_Actions.LOGOUT());
      } catch (error) {
        console.error(error?.message || "Failed to Logout");
      } finally {
        // Always redirect
        navigate("/login", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;
