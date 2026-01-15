// External Modules
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Local Modules
import Banner from "./components/Banner";
import api from "@utils/api.js";
import { APIsContext } from "@/storage/APIs";

function Profile() {
  // Declarations
  const { SET_AUTH_API_CALLED, AUTH_API_CALLED } = useContext(APIsContext);
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  const navigate = useNavigate();

  // Constants & States
  const { id } = useParams();
  const [USER_INFO, UPDATE_USER_INFO] = useState({});

  // Functions
  async function callAPI() {
    const response = await api("GET", `u/get/p/${id}`);
    UPDATE_USER_INFO(response.data.mongodata);
  }

  useEffect(() => {
    if (!id && USER?._id) {
      navigate(`/profile/${USER._id}`, { replace: true });
    } else if (id && USER?._id) {
      try {
        SET_AUTH_API_CALLED(true);
        callAPI();
      } catch (error) {
        console.log(error?.message || "Something went wrong!");
      } finally {
        SET_AUTH_API_CALLED(false);
      }
    }
  }, [id, USER?._id, navigate]);
  return (
    <div className="p-2">
      <Banner USER_INFO={USER_INFO} />
    </div>
  );
}

export default Profile;
