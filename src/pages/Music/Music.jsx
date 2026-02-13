// External Modules
import { useEffect } from "react";

// Local Modules
import api from "@utils/api.js";

function Music() {
  useEffect(() => {
    try {
      const handleApi = async () => {
        const call = await api("GET", "music/get");
        console.log(call);
      };
      handleApi();
    } catch (error) {}
  }, []);
  return;
}

export default Music;
