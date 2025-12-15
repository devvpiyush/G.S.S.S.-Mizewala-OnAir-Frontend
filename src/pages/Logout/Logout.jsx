// External Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import api from "@utils/api";
import useHead from "@hooks/Head.jsx";

function Logout() {
  useHead({
    title: "Logout | G.S.S.S. Mirzewala",
  });
  const navigate = useNavigate();
  useEffect(() => {
    api("POST", "auth/logout", true, {}).then(() => {
      navigate("/login");
    });
  }, []);
}

export default Logout;
