// React Hooks
import { useEffect, useState } from "react";

// Local Components
import useHead from "@hooks/Head.jsx";
import api from "@utils/api";
import Intro from "./components/Intro";
import Quote from "./components/Quote";
import PrincipalSays from "./components/PrincipalSays";
import NewUpdate from "./components/NewUpdate";
import Questions from "./components/Questions";

function Home() {
  useHead({
    title: "Home | G.S.S.S. Mirzewala",
  });
  // New Update Notification (Block)
  const [NOTIFY, SET_NOTIFY] = useState();
  const [NEW_UPDATE_DATA, SET_NEW_UPDATE_DATA] = useState(null);

  async function CheckNewUpdate() {
    SET_NEW_UPDATE_DATA(null);
    const response = await api("GET", "public/latestupdate", false);
    if (response.isSuccess) {
      SET_NOTIFY(true);
      SET_NEW_UPDATE_DATA(response.data);
    }
  }

  useEffect(() => {
    CheckNewUpdate();
  }, []);

  return (
    <>
      {NOTIFY && <NewUpdate SET_NOTIFY={SET_NOTIFY} data={NEW_UPDATE_DATA} />}
      <Quote />
      <Intro />
      <PrincipalSays />
      <section className="flex flex-col gap-4">
        <Questions />
      </section>
    </>
  );
}

export default Home;
