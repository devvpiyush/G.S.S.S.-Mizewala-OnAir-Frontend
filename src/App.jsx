// External Modules
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Styles Sheets
import "./App.css";

// Local Modules
import AppLoader from "@components/AppLoader";
import api from "@utils/api.js";
import RootProvider from "./RootProvider";

function App() {
  // States
  const [LOADING, SET_LOADING] = useState(false);

  useEffect(() => {
    async function checkHealth() {
      try {
        SET_LOADING(true);
        const start = performance.now();
        const response = await api("GET", "i/health", false);
        const duration = performance.now() - start;
        if (response.status === 200 && response.data.isSuccess === true) {
          if (duration < 3000) {
            const min = 2.5;
            const max = 5.5;
            const delay = Math.random() * (max - min) + min * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      } catch (error) {
        throw new Error(error?.message || "Something went wrong!");
      } finally {
        SET_LOADING(false);
        sessionStorage.setItem("appLoader", true);
      }
    }
    if (!sessionStorage.getItem("appLoader")) {
      checkHealth();
    }
  }, []);

  if (LOADING) {
    return <AppLoader />;
  }
  return (
    <RootProvider>
      <Outlet />
    </RootProvider>
  );
}

export default App;
