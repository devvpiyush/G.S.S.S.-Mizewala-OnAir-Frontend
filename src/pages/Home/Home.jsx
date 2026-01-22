// React Hooks
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

// Local Components
import Intro from "./components/Intro";
import Quote from "./components/Quote";
import PrincipalSays from "./components/PrincipalSays";
import NewUpdate from "./components/NewUpdate";
import Questions from "./components/Questions";
import api from "@utils/api";
import useHead from "@hooks/Head.jsx";

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
    if (response.status === 200 && response.data.success) {
      if (
        format(new Date(response.data.mongodata.createdAt), "yyyyMMdd") <=
        format(addDays(new Date(), 30), "yyyyMMdd")
      ) {
        SET_NOTIFY(true);
        return response.data.mongodata;
      } else {
        SET_NOTIFY(false);
      }
    }
  }

  useEffect(() => {
    CheckNewUpdate().then((data) => {
      SET_NEW_UPDATE_DATA(data);
    });
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
