// External Modules
import axios from "axios";

// Local Modules
import ERRORS from "@/data/Errors.js"

async function api(REQUEST_TYPE, END_POINT, WITH_CREDENTIALS = true, data) {
  try {
    const API_URI = `http://localhost:8000/api/${END_POINT}`;
    if (REQUEST_TYPE === "GET") {
      return await axios.get(API_URI, {
        withCredentials: WITH_CREDENTIALS ? true : false,
      });
    } else if (REQUEST_TYPE === "POST") {
      return await axios.post(API_URI, data, {
        withCredentials: WITH_CREDENTIALS ? true : false,
      });
    }
  } catch (error) {
    if (!error.response) {
      throw new Error("Server is not Responding. Try again later");
    }
    const errorCode = error.response.data?.errorCode || "WRONG";
    const message = ERRORS.find((err) => err.code === errorCode)?.message
    const err = new Error(message);
    err.status = error.response.status;

    throw err;
  }
}

export default api;
