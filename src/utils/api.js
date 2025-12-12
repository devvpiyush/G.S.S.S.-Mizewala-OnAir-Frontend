import axios from "axios";

async function api(REQUEST_TYPE, END_POINT, WITH_CREDENTIALS = true, DATA) {
  const API_URI = `https://api.gsssmirzewala.in/api/${END_POINT}`;
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
  } else {
    return new Error("Error: Invalid Request Type");
  }
}

export default api;
