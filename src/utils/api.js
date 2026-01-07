// External Modules
import axios from "axios";

async function api(REQUEST_TYPE, END_POINT, WITH_CREDENTIALS = true, DATA) {
  try {
    const API_URI = `${import.meta.env.VITE_API_BASE_URL
    }/api/${END_POINT}`;
    if (REQUEST_TYPE === "GET") {
      return await axios.get(API_URI, {
        withCredentials: WITH_CREDENTIALS ? true : false,
      });
    } else if (REQUEST_TYPE === "POST") {
      return await axios.post(
        API_URI,
        { data: DATA },
        { withCredentials: WITH_CREDENTIALS ? true : false }
      );
    }
  } catch (error) {
    if (!error.response) {
      throw new Error("Server is not Responding. Try again later");
    }
    const message = error.response.data?.message || "Something went wrong";
    const err = new Error(message);
    err.status = error.response.status;

    throw err;
  }
}

export default api;
