// External Modules
import axios from "axios";
import { toast } from "react-hot-toast";

// Local Modules
import ERRORS from "@/data/Errors.js";

function handleErrorAction(config) {
  switch (config.action) {
    case "SHOW_TOAST":
      toast.error(config.message);
      break;

    case "REDIRECT_LOGIN":
      window.location.href = "/login";
      break;

    case "REDIRECT_HOME":
      window.location.href = "/";
      break;

    default:
      toast.error("Unexpected error occurred");
  }
}

async function api(REQUEST_TYPE, END_POINT, WITH_CREDENTIALS = true, data) {
  const API_URI = `${import.meta.env.VITE_API_BASE_URL}/api/${END_POINT}`;
  try {
    const call = await axios({
      method: REQUEST_TYPE,
      url: API_URI,
      withCredentials: WITH_CREDENTIALS,
      data,
    });
    return call.data;
  } catch (err) {
    if (!err.response) {
      handleErrorAction("NETWORK_ERROR", ERRORS.NETWORK_ERROR);
      throw "NETWORK_ERROR";
    }
    const code = err?.response?.data?.code || "INTERNAL_SERVER_ERROR";
    const errorConfig = ERRORS[code] || ERRORS.INTERNAL_SERVER_ERROR;

    handleErrorAction(code, errorConfig);
    throw code;
  }
}

export default api;
