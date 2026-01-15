// External Modules
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Styles Sheets
import "./App.css";

// Local Modules
import AppLoader from "@components/AppLoader";
import health from "@utils/health.js";
import heartbeat from "@utils/heartbeat.js";
import API_Loader from "@components/API_Loader";
import { APIsContext } from "./storage/APIs";

function App() {
  // Declarations
  const { AUTH_API_CALLED, LOGIN_API_CALLED } = useContext(APIsContext);

  // States
  const [LOADING, SET_LOADING] = useState(false);
  const [API_LOADING, SET_API_LOADING] = useState(false);

  async function checkSession() {
    if (!sessionStorage.getItem("appLoader")) {
      try {
        SET_LOADING(true);
        await health();
      } catch (error) {
        throw new Error(error?.message || "Something went wrong!");
      } finally {
        SET_LOADING(false);
        sessionStorage.setItem("appLoader", true);
      }
    }
  }

  useEffect(() => {
    if (AUTH_API_CALLED || LOGIN_API_CALLED) {
      SET_API_LOADING(true);
    } else {
      SET_API_LOADING(false);
    }

    checkSession();
    heartbeat();
    const heatBeatInterval = setInterval(heartbeat, 30000); // Every 30 Seconds

    return () => clearInterval(heatBeatInterval);
  }, [AUTH_API_CALLED, LOGIN_API_CALLED]);

  if (API_LOADING) {
    return <API_Loader />;
  }

  if (LOADING) {
    return <AppLoader />;
  }
  return <Outlet />;
}

export default App;
