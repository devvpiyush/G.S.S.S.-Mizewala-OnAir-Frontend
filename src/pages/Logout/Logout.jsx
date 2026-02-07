// External Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local Modules
import api from "@utils/api";
import useHead from "@hooks/Head.jsx";
import { CommonIdentityActions } from "@/store/slices/CommonIdentitySlice";
import { SpecialIdentityActions } from "@/store/slices/SpecialIdentitySlice";

function Logout() {
  useHead({
    title: "Logout | G.S.S.S. Mirzewala",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      await api("POST", "auth/logout", true);
      dispatch(CommonIdentityActions.LOGOUT());
      dispatch(SpecialIdentityActions.LOGOUT());

      navigate("/");
      window.location.reload();
    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;
