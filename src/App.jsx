// External Modules
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Styles Sheets
import "./App.css";

// Local Modules
import AppLoader from "@components/AppLoader";
import health from "@utils/health.js";
import heartbeat from "@utils/heartbeat.js";
import { APIsContext } from "./contexts/APIs";
import { BPS } from "@/contexts/Protectors";

function App() {
  // Declarations
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  const { AUTH_API_CALLED, INTERNALS_API_CALLED, SET_INTERNALS_API_CALLED } =
    useContext(APIsContext);

  async function checkSession() {
    if (!sessionStorage.getItem("appLoader")) {
      try {
        SET_INTERNALS_API_CALLED(true);
        await health();
      } catch (error) {
        throw new Error(error?.message || "Something went wrong!");
      } finally {
        sessionStorage.setItem("appLoader", true);
        SET_INTERNALS_API_CALLED(false);
      }
    }
  }

  useEffect(() => {
    checkSession();

    if (USER.isLoggedIn) {
      heartbeat();
      const sendHeartBeat = setInterval(heartbeat, 30000); // Every 30 Seconds
      return () => clearInterval(sendHeartBeat);
    }
  }, [AUTH_API_CALLED]);

  if (AUTH_API_CALLED || INTERNALS_API_CALLED) {
    return <AppLoader />;
  }
  return (
    <BPS>
      <Outlet />
      <Toaster />
    </BPS>
  );
}

export default App;
